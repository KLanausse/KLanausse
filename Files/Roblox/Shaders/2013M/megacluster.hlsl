#include "common.h"

struct Appdata
{
    float4 Position	    : POSITION;
    float3 Normal	    : NORMAL;
    float2 UvHigh		: TEXCOORD0;
    float2 UvLow	    : TEXCOORD1;
    float4 EdgeDistances: TEXCOORD2;
};

struct VertexOutput
{
    float4 HPosition    : POSITION;

    float4 UvHigh_EdgeDistance1 : TEXCOORD0;
    float4 UvLow_EdgeDistance2  : TEXCOORD1;

    float4 Diffuse_Specular	: COLOR0;

    float4 LightPosition_Fog : TEXCOORD2;
    float4 Position_Depth    : TEXCOORD3;
};

uniform float3 CameraPosition;
uniform float4x4 ViewProjection;

uniform float3 Lamp0Dir;
uniform float3 Lamp0Color;
uniform float3 Lamp1Color;
uniform float3 AmbientColor;

uniform float WaterTimeframe;
uniform float WaterSintime;

uniform float3 FogColor;
uniform float4 FogParams;

uniform float4 LightConfig0;
uniform float4 LightConfig1;
uniform float4 LightConfig2;
uniform float4 LightConfig3;
uniform float4 LightBorder;
uniform float3 FadeDistance;
uniform float2 OutlineBrightness;

uniform float4x4 WorldMatrix;

// Function to generate pseudo-random value
float rand(float2 co) {
    return frac(sin(dot(co.xy ,float2(12.9898,78.233))) * 43758.5453);
}

VertexOutput MegaClusterVS(Appdata IN)
{
    VertexOutput OUT = (VertexOutput)0;
    
#ifdef GLSLES
    // Decode vertex data from integer representation
    IN.Normal /= 127;
    IN.UvHigh /= 1024;
    IN.UvLow /= 1024;
#endif

    // Transform position and normal to world space
    // Note: world matrix does not contain rotation/scale for static geometry so we can avoid transforming normal
	float3 posWorld = mul(WorldMatrix, IN.Position).xyz;

    // Water encodes normal speed in normal length
#ifdef PIN_WATER
    float3 normalWorld = normalize(IN.Normal);
#else
    float3 normalWorld = IN.Normal;
#endif

    float ndotl = dot(normalWorld, -Lamp0Dir);

    float3 dif = posWorld - CameraPosition;
 
 posWorld = float3(
  posWorld.x,
  posWorld.y - (dif.x*dif.x + dif.z*dif.z)/100.0,
  posWorld.z
 );

	OUT.HPosition = mul(ViewProjection, float4(posWorld, 1));

    float3 diffuse = saturate(ndotl) * Lamp0Color + max(-ndotl, 0) * Lamp1Color;

#ifdef PIN_WATER
    float specularIntensity = 0.4f;
    float specularPower = 25.f;

    // Using lit here improves performance on software vertex shader implementations
    float2 lt = lit(ndotl, dot(normalize(-Lamp0Dir + normalize(CameraPosition - posWorld.xyz)), normalWorld), specularPower).yz;

    OUT.Diffuse_Specular = float4(diffuse, specularIntensity * lt.y);
#else
    OUT.Diffuse_Specular = float4(diffuse, 0);
#endif

    OUT.LightPosition_Fog = float4(lgridPrepareSample(lgridOffset(posWorld, normalWorld), LightConfig0, LightConfig1), (FogParams.z - OUT.HPosition.w) * FogParams.w);
    OUT.Position_Depth = float4(posWorld, OUT.HPosition.w * FadeDistance.y);

#ifdef PIN_WATER
    float normalLength = abs(dot(IN.Normal, 1));
    float speed = floor(normalLength);
    float hasNonZeroFlow = min(1, speed);
    float hasZeroFlow = 1 - hasNonZeroFlow;
    
    // encode: speed == 0 ? sintime : timeframe * speed
    float textureOffset = (hasNonZeroFlow * WaterTimeframe * speed) + hasZeroFlow * 0.125 * WaterSintime;

    // encode: speed == 0 ? (x + offset, y) : (x, y + offset)
    float2 subsurfaceCoord = IN.UvHigh - float2(hasZeroFlow, hasNonZeroFlow) * 3 * textureOffset;

    OUT.UvHigh_EdgeDistance1.xy = subsurfaceCoord;
    OUT.UvLow_EdgeDistance2.xy = float2(IN.UvHigh.x, IN.UvHigh.y - 4 * textureOffset);
#else
    OUT.UvHigh_EdgeDistance1.xy = IN.UvHigh;
    OUT.UvLow_EdgeDistance2.xy = IN.UvLow;
#endif

#if defined(PIN_HQ)
    float4 edgeDistances = IN.EdgeDistances*FadeDistance.z + 0.5 * OUT.Position_Depth.w;
    OUT.UvHigh_EdgeDistance1.zw = edgeDistances.xy;
    OUT.UvLow_EdgeDistance2.zw = edgeDistances.zw;
#endif

	return OUT;
}

sampler2D DiffuseHighMap: register(s0);
sampler2D DiffuseLowMap: register(s1);
LGRID_SAMPLER LightMap: register(s2);
sampler2D LightMapLookup: register(s3);

void MegaClusterPS(VertexOutput IN,
#ifdef PIN_GBUFFER
    out float4 oColor1: COLOR1,
#endif
    out float4 oColor0: COLOR0)
{
    // Compute albedo term
#ifdef PIN_WATER
    float4 wave = tex2D(DiffuseHighMap, IN.UvHigh_EdgeDistance1);
    float4 ss0 = tex2D(DiffuseLowMap, IN.UvLow_EdgeDistance2);
	float4 ss1 = tex2D(DiffuseLowMap, IN.UvHigh_EdgeDistance1);

    float3 albedo = lerp(ss1.rgb, lerp(ss0.rgb, wave.rgb, wave.a), ss1.a);
#else
    float4 high = tex2D(DiffuseHighMap, IN.UvHigh_EdgeDistance1);
    float4 low = tex2D(DiffuseLowMap, IN.UvLow_EdgeDistance2);

    float3 albedo = lerp(low.rgb, high.rgb, high.a);
#endif

    float4 light = lgridSample(LightMap, LightMapLookup, IN.LightPosition_Fog.xyz, LightConfig2, LightConfig3, LightBorder);

    // For some reason, terrain ambient was multiplied by 0.5
#ifdef PIN_WATER
    float ambientFactor = 1;
#else
    float ambientFactor = 0.5;
#endif

    // Compute diffuse term
    float3 diffuse = (AmbientColor * ambientFactor + IN.Diffuse_Specular.rgb * light.a + light.rgb) * albedo.rgb;

    // Compute specular term
#ifdef PIN_WATER
    float3 specular = Lamp0Color * (IN.Diffuse_Specular.a * light.a);
#else
    float3 specular = 0;
#endif

    // Combine
    oColor0.rgb = diffuse + specular;
    oColor0.a = 1;

   

#ifdef PIN_HQ
	float outlineFade = saturate1(IN.Position_Depth.w * OutlineBrightness.x + OutlineBrightness.y);
	float2 minIntermediate = min(IN.UvHigh_EdgeDistance1.wz, IN.UvLow_EdgeDistance2.wz);
	float minEdgesPlus = min(minIntermediate.x, minIntermediate.y) / IN.Position_Depth.w;
	oColor0.rgb *= saturate1(outlineFade *(1.5 - minEdgesPlus) + minEdgesPlus);
#endif

 float fogAlpha = saturate1(IN.LightPosition_Fog.w);

#ifdef GLSL
    // Manually apply fog in GLSL path
    oColor0.rgb = lerp(FogColor, oColor0.rgb, fogAlpha);
#endif

#ifdef PIN_GBUFFER
    oColor1 = gbufferPack(IN.Position_Depth.w*FadeDistance.x, diffuse.rgb, specular.rgb, fogAlpha);
#endif
}

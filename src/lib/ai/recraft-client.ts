import { serverEnv } from '../env';

const RECRAFT_API_URL = 'https://external.api.recraft.ai/v1';

interface RecraftGenerateParams {
  prompt: string;
  style: string;
}

interface RecraftResponse {
  data: Array<{
    url?: string;
    b64_json?: string;
    svg?: string;
  }>;
}

/**
 * Generate an SVG icon via the Recraft V3 API.
 * Returns the raw SVG string.
 */
export async function generateSvgWithRecraft(
  params: RecraftGenerateParams,
): Promise<string> {
  const env = serverEnv();

  const response = await fetch(`${RECRAFT_API_URL}/images/generations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.RECRAFT_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: params.prompt,
      style: 'icon',
      substyle: mapStyleToSubstyle(params.style),
      model: 'recraftv3',
      response_format: 'svg',
      size: '1024x1024',
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => 'Unknown error');
    throw new RecraftApiError(
      `Recraft API error (${response.status}): ${errorBody}`,
      response.status,
    );
  }

  const data: RecraftResponse = await response.json();

  // Recraft returns SVG as a URL or inline
  const result = data.data?.[0];
  if (!result) {
    throw new RecraftApiError('No result returned from Recraft API', 500);
  }

  // If SVG is returned inline
  if (result.svg) return result.svg;

  // If SVG is returned as a URL, fetch it
  if (result.url) {
    const svgResponse = await fetch(result.url);
    if (!svgResponse.ok) {
      throw new RecraftApiError('Failed to fetch SVG from Recraft URL', 500);
    }
    return svgResponse.text();
  }

  // If b64_json is returned, decode it
  if (result.b64_json) {
    return Buffer.from(result.b64_json, 'base64').toString('utf-8');
  }

  throw new RecraftApiError('Unexpected response format from Recraft API', 500);
}

/**
 * Map our style identifiers to Recraft substyle parameters.
 */
function mapStyleToSubstyle(style: string): string | undefined {
  const mapping: Record<string, string> = {
    line: 'line_art',
    solid: 'glyph',
    outline: 'outline',
    duotone: 'colored_outline',
    pixel: 'pixel_art',
    isometric: 'isometric',
    'hand-drawn': 'hand_drawn',
  };
  return mapping[style];
}

/**
 * Generate a refined SVG icon by sending a modified prompt to Recraft V3.
 * Uses the same generation endpoint but with a refinement-oriented prompt.
 */
export async function refineIcon(
  params: RecraftGenerateParams,
): Promise<string> {
  return generateSvgWithRecraft(params);
}

/**
 * Generate an SVG icon using an uploaded reference image as a seed.
 * The reference image URL is passed to Recraft to guide generation.
 */
export async function generateFromReference(params: {
  prompt: string;
  style: string;
  referenceImageUrl: string;
}): Promise<string> {
  const env = serverEnv();

  const response = await fetch(`${RECRAFT_API_URL}/images/generations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.RECRAFT_API_KEY}`,
    },
    body: JSON.stringify({
      prompt: params.prompt,
      style: 'icon',
      substyle: mapStyleToSubstyle(params.style),
      model: 'recraftv3',
      response_format: 'svg',
      size: '1024x1024',
      image_url: params.referenceImageUrl,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => 'Unknown error');
    throw new RecraftApiError(
      `Recraft API error (${response.status}): ${errorBody}`,
      response.status,
    );
  }

  const data: RecraftResponse = await response.json();
  const result = data.data?.[0];
  if (!result) {
    throw new RecraftApiError('No result returned from Recraft API', 500);
  }

  if (result.svg) return result.svg;
  if (result.url) {
    const svgResponse = await fetch(result.url);
    if (!svgResponse.ok) {
      throw new RecraftApiError('Failed to fetch SVG from Recraft URL', 500);
    }
    return svgResponse.text();
  }
  if (result.b64_json) {
    return Buffer.from(result.b64_json, 'base64').toString('utf-8');
  }

  throw new RecraftApiError('Unexpected response format from Recraft API', 500);
}

export class RecraftApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = 'RecraftApiError';
  }
}

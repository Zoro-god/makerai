export interface DesignResponse {
  project_name: string;
  object_detected: string;
  design_concept: string;
  recommended_dimensions: {
    height: string;
    width: string;
    depth: string;
  };
  materials: string[];
  tools_needed: string[];
  build_steps: string[];
  stability_notes: string;
  ascii_diagram: string;
  image_url?: string;
}

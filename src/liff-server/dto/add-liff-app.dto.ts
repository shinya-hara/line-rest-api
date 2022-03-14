export class AddLiffAppDto {
  view: {
    type: 'full' | 'tall' | 'compact';
    url: string;
    moduleMode?: boolean;
  };
  description: string;
  features?: {
    ble: boolean;
  };
  permanentLinkPattern?: 'concat';
}

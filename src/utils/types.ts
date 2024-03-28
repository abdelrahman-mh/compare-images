export type NotificationTypes = "error" | "success" | "warring";

export type Side = "left" | "right";

export interface Image {
  url: string;
  name: string;
  size: number;
  side: Side;
}

export interface IEmitToastEvent {
  message: string;
  autoHideDuration?: number;
  severity?: 'success' | 'error' | 'info' | 'warning';
}

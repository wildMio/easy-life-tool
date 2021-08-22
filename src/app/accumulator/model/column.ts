import { AccumulatorRecord } from './record.model';

export type ColumnType = 'text' | 'date';

export interface Column {
  headerName: string;
  width: string;
  fieldId: keyof AccumulatorRecord;
  visible: boolean;
  type: ColumnType;
}

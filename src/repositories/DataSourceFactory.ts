import type { IDataSource } from './IDataSource';
import { JSONDataSource } from './JSONDataSource';

let dataSourceInstance: IDataSource | null = null;

export function getDataSource(): IDataSource {
  if (!dataSourceInstance) {
    dataSourceInstance = new JSONDataSource();
  }
  return dataSourceInstance;
}

export function setDataSource(source: IDataSource): void {
  dataSourceInstance = source;
}

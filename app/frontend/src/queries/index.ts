import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { groupKeys } from './group';
import { mogacoKeys } from './mogaco';

export const queryKeys = mergeQueryKeys(groupKeys, mogacoKeys);

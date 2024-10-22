/**
 * @NAPIVersion 2.1
 * @NScriptType UserEventScript
 */

import {EntryPoints} from 'N/types'
import log = require('N/log');
import query = require('N/query');

// Let's assume this example is deployed to sales orders
export function beforeSubmit(ctx: EntryPoints.UserEvent.beforeSubmitContext) {
  if (ctx.type == ctx.UserEventType.CREATE) {
    const customerId = ctx.newRecord.getValue('entity') as string;
    log.debug('beforeSubmit', `Submitting new transaction for entity: ${customerId}`); // When creating a transaction from an entity, log the entity internal id

    // SuiteQL example
    const results: { companyname: string }[] = query.runSuiteQL({
      query: `SELECT companyName FROM customer WHERE id = ?`,
      params: [customerId]
    }).asMappedResults() as any;
    log.debug('beforeSubmit', `Customer ${customerId} values: ${JSON.stringify(results)}`);
  }
}

import SQLiteParserListener from './SQLiteParserListener.js'

export class CustomListener extends SQLiteParserListener {

    constructor(result) {
        super();
        this.result = result;
        this.sqlStruct = null;
    }

    buildSqlStruct(command) {
        return {
	    	command: command,
            columns: [],
	        values: [],
            table: [],
            conditions: null,
	        between: null,
	        range: null,
            groupby: null,
            orderby: null,
	        not: false
        };
    }
   
	// Enter a parse tree produced by SQLiteParser#parse.
	enterParse(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#parse.
	exitParse(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#error.
	enterError(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#error.
	exitError(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#sql_stmt_list.
	enterSql_stmt_list(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#sql_stmt_list.
	exitSql_stmt_list(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#sql_stmt.
	enterSql_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#sql_stmt.
	exitSql_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#alter_table_stmt.
	enterAlter_table_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#alter_table_stmt.
	exitAlter_table_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#analyze_stmt.
	enterAnalyze_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#analyze_stmt.
	exitAnalyze_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#attach_stmt.
	enterAttach_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#attach_stmt.
	exitAttach_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#begin_stmt.
	enterBegin_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#begin_stmt.
	exitBegin_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#commit_stmt.
	enterCommit_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#commit_stmt.
	exitCommit_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#common_table_statement.
	enterCommon_table_statement(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#common_table_statement.
	exitCommon_table_statement(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#compound_select_stmt.
	enterCompound_select_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#compound_select_stmt.
	exitCompound_select_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#create_index_stmt.
	enterCreate_index_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#create_index_stmt.
	exitCreate_index_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#create_table_stmt.
	enterCreate_table_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#create_table_stmt.
	exitCreate_table_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#create_trigger_stmt.
	enterCreate_trigger_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#create_trigger_stmt.
	exitCreate_trigger_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#create_view_stmt.
	enterCreate_view_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#create_view_stmt.
	exitCreate_view_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#create_virtual_table_stmt.
	enterCreate_virtual_table_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#create_virtual_table_stmt.
	exitCreate_virtual_table_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#delete_stmt.
	enterDelete_stmt(ctx) {
	  
		this.sqlStruct = this.buildSqlStruct('delete');	

		ctx.children.forEach(children => {

			switch(children.constructor.name) {

				case 'Qualified_table_nameContext':
					this.sqlStruct.table = children.getText();
					break;

				case 'ExprContext':
					this.sqlStruct.conditions = children.getText();
					break;

				default:
					break;

			}

		})

    //console.log(this.sqlStruct)

	}
   
	// Exit a parse tree produced by SQLiteParser#delete_stmt.
	exitDelete_stmt(ctx) {

		if(this.sqlStruct && this.sqlStruct.command === 'delete') {

			const table = this.sqlStruct.table;
			let conditions = this.sqlStruct.conditions;
      
			let splitedConditions = conditions.split('&');
			splitedConditions = this.enterExpr_formatExpr(splitedConditions, table);
			
			conditions = splitedConditions.toString().replaceAll(',', ' && ');

			this.result.push(`deleteFrom('${table}', where('${conditions}'))`);
			this.sqlStruct = null;

		}

	}
   

	enterExpr_formatExpr(conditions, table) {

		const formatedConditions = []

		conditions.forEach(condition => {

			condition = this.enterExpr_formatExprWithTable(condition, table);

			if(condition.search('>=') != -1) {
				formatedConditions.push(condition.replace('>=', ' >= '));
			} else if(condition.search('<=') != -1) {
				formatedConditions.push(condition.replace('<=', ' <= '));
			} else if(condition.search('!=') != -1) {
				formatedConditions.push(condition.replace('!=', ' != '));      
			} else if(condition.search('=') != -1) {
				formatedConditions.push(condition.replace('=', ' === ' ));
			}

		});

		return formatedConditions;

	}


	enterExpr_formatExprWithTable(condition, table) {

		return `${table}.${condition}`;

	}

   
	// Enter a parse tree produced by SQLiteParser#delete_stmt_limited.
	enterDelete_stmt_limited(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#delete_stmt_limited.
	exitDelete_stmt_limited(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#detach_stmt.
	enterDetach_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#detach_stmt.
	exitDetach_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#drop_stmt.
	enterDrop_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#drop_stmt.
	exitDrop_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#factored_select_stmt.
	enterFactored_select_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#factored_select_stmt.
	exitFactored_select_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#order_by_stmt.
	enterOrder_by_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#order_by_stmt.
	exitOrder_by_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#limit_stmt.
	enterLimit_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#limit_stmt.
	exitLimit_stmt(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#insert_stmt.
	enterInsert_stmt(ctx) {
			
		this.sqlStruct = this.buildSqlStruct('insert');

		if(ctx.children) {
			ctx.children.forEach(child => {

				switch(child.constructor.name) {

					case 'Table_nameContext':
						this.sqlStruct.table = child.getText()
						break;

					case 'TerminalNodeImpl':
						break;

					case 'Column_nameContext':
						this.sqlStruct.columns.push(child.getText())
						break;

					case 'ExprContext': 
						this.sqlStruct.values.push(child.getText())
						break;
						
					default:
						break;

				}
				
			})
		}
	}

	// Exit a parse tree produced by SQLiteParser#insert_stmt.
	exitInsert_stmt(ctx) {

		if(this.sqlStruct && this.sqlStruct.command === 'insert') {

			const table = this.sqlStruct.table;
			const values = this.sqlStruct.values.toString();

			this.result.push(`insert(into('${table}'), values(${values}))`);
			this.sqlStruct = null;

		}        

	}

   
	// Enter a parse tree produced by SQLiteParser#pragma_stmt.
	enterPragma_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#pragma_stmt.
	exitPragma_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#reindex_stmt.
	enterReindex_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#reindex_stmt.
	exitReindex_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#release_stmt.
	enterRelease_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#release_stmt.
	exitRelease_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#rollback_stmt.
	enterRollback_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#rollback_stmt.
	exitRollback_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#savepoint_stmt.
	enterSavepoint_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#savepoint_stmt.
	exitSavepoint_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#simple_select_stmt.
	enterSimple_select_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#simple_select_stmt.
	exitSimple_select_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#select_stmt.
	enterSelect_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#select_stmt.
	exitSelect_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#select_or_values.
	enterSelect_or_values(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#select_or_values.
	exitSelect_or_values(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#update_stmt.
	enterUpdate_stmt(ctx) {

		this.sqlStruct = this.buildSqlStruct('update');
		let nextValueIsACondition = false;

		ctx.children.forEach(children => {

			//console.log(children.constructor.name + " " + children.getText());

			switch(children.constructor.name) {

				case 'Qualified_table_nameContext':
					this.sqlStruct.table = children.getText();
					break;

				case 'Column_nameContext':
					this.sqlStruct.columns.push(children.getText());
					break;

				case 'Fe':
					if(children.getText() === 'where') {
						nextValueIsACondition = true;
					}
					break;

				case 'ExprContext':
				
					if(nextValueIsACondition) {
						this.sqlStruct.conditions.push(children.getText());
					} else {
						this.sqlStruct.values.push(children.getText());
					}

					break;

			}

		})

		console.log(this.sqlStruct);

	}
   
	// Exit a parse tree produced by SQLiteParser#update_stmt.
	exitUpdate_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#update_stmt_limited.
	enterUpdate_stmt_limited(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#update_stmt_limited.
	exitUpdate_stmt_limited(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#vacuum_stmt.
	enterVacuum_stmt(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#vacuum_stmt.
	exitVacuum_stmt(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#column_def.
	enterColumn_def(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#column_def.
	exitColumn_def(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#type_name.
	enterType_name(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#type_name.
	exitType_name(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#column_constraint.
	enterColumn_constraint(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#column_constraint.
	exitColumn_constraint(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#conflict_clause.
	enterConflict_clause(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#conflict_clause.
	exitConflict_clause(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#expr.
	enterExpr(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#expr.
	exitExpr(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#foreign_key_clause.
	enterForeign_key_clause(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#foreign_key_clause.
	exitForeign_key_clause(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#raise_function.
	enterRaise_function(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#raise_function.
	exitRaise_function(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#indexed_column.
	enterIndexed_column(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#indexed_column.
	exitIndexed_column(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#table_constraint.
	enterTable_constraint(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#table_constraint.
	exitTable_constraint(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#with_clause.
	enterWith_clause(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#with_clause.
	exitWith_clause(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#qualified_table_name.
	enterQualified_table_name(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#qualified_table_name.
	exitQualified_table_name(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#ordering_term.
	enterOrdering_term(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#ordering_term.
	exitOrdering_term(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#pragma_value.
	enterPragma_value(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#pragma_value.
	exitPragma_value(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#common_table_expression.
	enterCommon_table_expression(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#common_table_expression.
	exitCommon_table_expression(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#result_column.
	enterResult_column(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#result_column.
	exitResult_column(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#window_function.
	enterWindow_function(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#window_function.
	exitWindow_function(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#offset.
	enterOffset(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#offset.
	exitOffset(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#default_value.
	enterDefault_value(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#default_value.
	exitDefault_value(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#partition_by.
	enterPartition_by(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#partition_by.
	exitPartition_by(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#order_by_expr.
	enterOrder_by_expr(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#order_by_expr.
	exitOrder_by_expr(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#order_by_expr_asc_desc.
	enterOrder_by_expr_asc_desc(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#order_by_expr_asc_desc.
	exitOrder_by_expr_asc_desc(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#expr_asc_desc.
	enterExpr_asc_desc(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#expr_asc_desc.
	exitExpr_asc_desc(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#asc_desc.
	enterAsc_desc(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#asc_desc.
	exitAsc_desc(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#frame_clause.
	enterFrame_clause(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#frame_clause.
	exitFrame_clause(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#frame_start.
	enterFrame_start(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#frame_start.
	exitFrame_start(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#frame_end.
	enterFrame_end(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#frame_end.
	exitFrame_end(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#table_or_subquery.
	enterTable_or_subquery(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#table_or_subquery.
	exitTable_or_subquery(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#join_clause.
	enterJoin_clause(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#join_clause.
	exitJoin_clause(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#join_operator.
	enterJoin_operator(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#join_operator.
	exitJoin_operator(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#join_constraint.
	enterJoin_constraint(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#join_constraint.
	exitJoin_constraint(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#select_core.
	enterSelect_core(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#select_core.
	exitSelect_core(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#compound_operator.
	enterCompound_operator(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#compound_operator.
	exitCompound_operator(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#cte_table_name.
	enterCte_table_name(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#cte_table_name.
	exitCte_table_name(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#signed_number.
	enterSigned_number(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#signed_number.
	exitSigned_number(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#literal_value.
	enterLiteral_value(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#literal_value.
	exitLiteral_value(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#unary_operator.
	enterUnary_operator(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#unary_operator.
	exitUnary_operator(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#error_message.
	enterError_message(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#error_message.
	exitError_message(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#module_argument.
	enterModule_argument(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#module_argument.
	exitModule_argument(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#column_alias.
	enterColumn_alias(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#column_alias.
	exitColumn_alias(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#keyword.
	enterKeyword(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#keyword.
	exitKeyword(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#name.
	enterName(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#name.
	exitName(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#function_name.
	enterFunction_name(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#function_name.
	exitFunction_name(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#database_name.
	enterDatabase_name(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#database_name.
	exitDatabase_name(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#table_name.
	enterTable_name(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#table_name.
	exitTable_name(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#table_or_index_name.
	enterTable_or_index_name(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#table_or_index_name.
	exitTable_or_index_name(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#new_table_name.
	enterNew_table_name(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#new_table_name.
	exitNew_table_name(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#column_name.
	enterColumn_name(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#column_name.
	exitColumn_name(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#collation_name.
	enterCollation_name(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#collation_name.
	exitCollation_name(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#foreign_table.
	enterForeign_table(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#foreign_table.
	exitForeign_table(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#index_name.
	enterIndex_name(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#index_name.
	exitIndex_name(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#trigger_name.
	enterTrigger_name(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#trigger_name.
	exitTrigger_name(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#view_name.
	enterView_name(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#view_name.
	exitView_name(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#module_name.
	enterModule_name(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#module_name.
	exitModule_name(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#pragma_name.
	enterPragma_name(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#pragma_name.
	exitPragma_name(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#savepoint_name.
	enterSavepoint_name(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#savepoint_name.
	exitSavepoint_name(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#table_alias.
	enterTable_alias(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#table_alias.
	exitTable_alias(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#transaction_name.
	enterTransaction_name(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#transaction_name.
	exitTransaction_name(ctx) {
	}
   
   
	// Enter a parse tree produced by SQLiteParser#any_name.
	enterAny_name(ctx) {
	}
   
	// Exit a parse tree produced by SQLiteParser#any_name.
	exitAny_name(ctx) {
	}

	

}

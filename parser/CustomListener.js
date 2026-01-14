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
            database: null,
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


	// Enter a parse tree produced by SQLiteParser#release_stmt.
	enterRelease_stmt(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#release_stmt.
	exitRelease_stmt(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#create_index_stmt.
	enterCreate_index_stmt(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#create_index_stmt.
	exitCreate_index_stmt(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#indexed_column.
	enterIndexed_column(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#indexed_column.
	exitIndexed_column(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#create_table_stmt.
	enterCreate_table_stmt(ctx) {

		this.sqlStruct = this.buildSqlStruct('create_table');

   		ctx.children.forEach(child => {
		
			switch(child.constructor.name) {
				
				case 'Table_nameContext':
					this.sqlStruct.table = child.getText();
					break;
				
				case 'Column_defContext':
					this.sqlStruct.columns.push("'" + child.getText() + "'");
					break;
				
				default:
					break;
				
			}

		});

	}

	// Exit a parse tree produced by SQLiteParser#create_table_stmt.
	exitCreate_table_stmt(ctx) {

		if(this.sqlStruct && this.sqlStruct.command === 'create_table') {

			const table = this.sqlStruct.table;
			const columns = this.sqlStruct.columns;

			this.result.push(`create('table', '${table}', [${columns}])`);
			this.sqlStruct = null;

		}

	}


	// Enter a parse tree produced by SQLiteParser#create_database_stmt.
	enterCreate_database_stmt(ctx) {

		this.sqlStruct = this.buildSqlStruct('create_database');

		ctx.children.forEach(child => {

			switch(child.constructor.name) {

				case 'Schema_nameContext':
					this.sqlStruct.database = child.getText();
					break;
				
				default:
					break;
				
			}

		});

	}

	// Exit a parse tree produced by SQLiteParser#create_database_stmt.
	exitCreate_database_stmt(ctx) {
	
		if(this.sqlStruct && this.sqlStruct.command === 'create_database') {

			const database_name = this.sqlStruct.database;

			this.result.push(`create('database', '${database_name}')`)
			this.sqlStruct = null;

		}
	
	}


	// Enter a parse tree produced by SQLiteParser#table_options.
	enterTable_options(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#table_options.
	exitTable_options(ctx) {
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


	// Enter a parse tree produced by SQLiteParser#signed_number.
	enterSigned_number(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#signed_number.
	exitSigned_number(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#table_constraint.
	enterTable_constraint(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#table_constraint.
	exitTable_constraint(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#foreign_key_clause.
	enterForeign_key_clause(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#foreign_key_clause.
	exitForeign_key_clause(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#conflict_clause.
	enterConflict_clause(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#conflict_clause.
	exitConflict_clause(ctx) {
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


	// Enter a parse tree produced by SQLiteParser#with_clause.
	enterWith_clause(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#with_clause.
	exitWith_clause(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#common_table_expression.
	enterCommon_table_expression(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#common_table_expression.
	exitCommon_table_expression(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#cte_table_name.
	enterCte_table_name(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#cte_table_name.
	exitCte_table_name(ctx) {
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
          			this.sqlStruct.conditions = [];
					this.sqlStruct.conditions.push(children.getText());
					break;

				default:
					break;

			}

		});

	}

	// Exit a parse tree produced by SQLiteParser#delete_stmt.
	exitDelete_stmt(ctx) {

		if(this.sqlStruct && this.sqlStruct.command === 'delete') {

			const table = this.sqlStruct.table;
			let conditions = this.sqlStruct.conditions[0];
      
			let splitedConditions = conditions.split('&');
			splitedConditions = this.enterExpr_formatExpr(splitedConditions, table);
			
			conditions = splitedConditions.toString().replaceAll(',', ' && ');

			this.result.push(`deleteFrom("${table}", where("${conditions}"))`);
			this.sqlStruct = null;

		}

	}


	// Enter a parse tree produced by SQLiteParser#describe_stmt.
	enterDescribe_stmt(ctx) {

		this.sqlStruct = this.buildSqlStruct('desc');

		ctx.children.forEach(child => {

			switch(child.constructor.name) {

				case 'Table_nameContext':
					this.sqlStruct.table = child.getText();
					break;
				
				default:
					break;
				
			}

		});

	}

	// Exit a parse tree produced by SQLiteParser#describe_stmt.
	exitDescribe_stmt(ctx) {

		if(this.sqlStruct && this.sqlStruct.command === 'desc') {
			
			const table_name = this.sqlStruct.table;

			this.result.push(`desc('${table_name}')`);
			this.sqlStruct = null;

		}

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


	// Enter a parse tree produced by SQLiteParser#expr.
	enterExpr(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#expr.
	exitExpr(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#expr_recursive.
	enterExpr_recursive(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#expr_recursive.
	exitExpr_recursive(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#expr_or.
	enterExpr_or(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#expr_or.
	exitExpr_or(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#expr_and.
	enterExpr_and(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#expr_and.
	exitExpr_and(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#expr_not.
	enterExpr_not(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#expr_not.
	exitExpr_not(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#expr_binary.
	enterExpr_binary(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#expr_binary.
	exitExpr_binary(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#expr_comparison.
	enterExpr_comparison(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#expr_comparison.
	exitExpr_comparison(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#expr_bitwise.
	enterExpr_bitwise(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#expr_bitwise.
	exitExpr_bitwise(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#expr_addition.
	enterExpr_addition(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#expr_addition.
	exitExpr_addition(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#expr_multiplication.
	enterExpr_multiplication(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#expr_multiplication.
	exitExpr_multiplication(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#expr_string.
	enterExpr_string(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#expr_string.
	exitExpr_string(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#expr_collate.
	enterExpr_collate(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#expr_collate.
	exitExpr_collate(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#expr_unary.
	enterExpr_unary(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#expr_unary.
	exitExpr_unary(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#expr_base.
	enterExpr_base(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#expr_base.
	exitExpr_base(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#raise_function.
	enterRaise_function(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#raise_function.
	exitRaise_function(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#literal_value.
	enterLiteral_value(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#literal_value.
	exitLiteral_value(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#percentile_clause.
	enterPercentile_clause(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#percentile_clause.
	exitPercentile_clause(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#value_row.
	enterValue_row(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#value_row.
	exitValue_row(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#values_clause.
	enterValues_clause(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#values_clause.
	exitValues_clause(ctx) {
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

					case 'Select_stmtContext': 

						child.getText()
						.substring(7, child.getText().length - 1).toString()
						.split(',')
						.forEach(value => {
							this.sqlStruct.values.push(value);
						})
						
						break;
					
					default:
						break;

				}
				
			});
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


	// Enter a parse tree produced by SQLiteParser#returning_clause.
	enterReturning_clause(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#returning_clause.
	exitReturning_clause(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#upsert_clause.
	enterUpsert_clause(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#upsert_clause.
	exitUpsert_clause(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#pragma_stmt.
	enterPragma_stmt(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#pragma_stmt.
	exitPragma_stmt(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#pragma_value.
	enterPragma_value(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#pragma_value.
	exitPragma_value(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#reindex_stmt.
	enterReindex_stmt(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#reindex_stmt.
	exitReindex_stmt(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#select_stmt.
	enterSelect_stmt(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#select_stmt.
	exitSelect_stmt(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#join_clause.
	enterJoin_clause(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#join_clause.
	exitJoin_clause(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#select_core.
	enterSelect_core(ctx) {

		if(!this.sqlStruct) {
			this.sqlStruct = this.buildSqlStruct('select');
		}

		ctx.children.forEach(child => {
		
			switch(child.constructor.name) {
				
				case 'Join_clauseContext':
					this.sqlStruct.table = child.getText();
					break;
				
				case 'Result_columnContext':
					this.sqlStruct.columns.push(child.getText());
					break;

				case 'ExprContext':
					this.sqlStruct.conditions = [];
					this.sqlStruct.conditions.push(child.getText());
					break;

				default:
					break;
				
			}

		});

	}

	// Exit a parse tree produced by SQLiteParser#select_core.
	exitSelect_core(ctx) {

		if(this.sqlStruct && this.sqlStruct.command === 'select') {

			const table = this.sqlStruct.table;
			const columns = this.sqlStruct.columns;

			let query = `select('${columns}', from('${table}')`; 

			if(this.sqlStruct.conditions) {
				
				let conditions = this.sqlStruct.conditions[0];
				let splitedConditions = conditions.split('&');
					
				splitedConditions = this.enterExpr_formatExpr(splitedConditions, table);
				
				conditions = splitedConditions.toString().replaceAll(',', ' && ');
				
				query = query.concat(`, where("${conditions}")`);
				
			}

			this.result.push(query.concat(')'));
			this.sqlStruct = null;

		}

	}


	// Enter a parse tree produced by SQLiteParser#table_or_subquery.
	enterTable_or_subquery(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#table_or_subquery.
	exitTable_or_subquery(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#result_column.
	enterResult_column(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#result_column.
	exitResult_column(ctx) {
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


	// Enter a parse tree produced by SQLiteParser#compound_operator.
	enterCompound_operator(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#compound_operator.
	exitCompound_operator(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#update_stmt.
	enterUpdate_stmt(ctx) {

		this.sqlStruct = this.buildSqlStruct('update');
		let nextValueIsACondition = false;

		ctx.children.forEach(child => {

			switch(child.constructor.name) {

				case 'Qualified_table_nameContext':
					this.sqlStruct.table = child.getText();
					break;

				case 'Column_nameContext':
					this.sqlStruct.columns.push(child.getText());
					break;

				case 'Fe':
					if(child.getText() === 'where') {
						nextValueIsACondition = true;
					}
					break;

				case 'ExprContext':
			  	
					if(nextValueIsACondition) {
						this.sqlStruct.conditions = [];
						this.sqlStruct.conditions.push(child.getText());
					} else {
						this.sqlStruct.values.push(child.getText());
					}

					break;

			}

		});

	}

	// Exit a parse tree produced by SQLiteParser#update_stmt.
	exitUpdate_stmt(ctx) {

		if(this.sqlStruct && this.sqlStruct.command === 'update') {

			const table = this.sqlStruct.table;
			const column = this.sqlStruct.columns[0];
			const value = this.sqlStruct.values[0];
			
			let query = `update('${table}', set("${table}.${column} = ${value}")`;

			if(this.sqlStruct.conditions) {
				
				var conditions = this.sqlStruct.conditions[0];
				let splitedConditions = conditions.split('&');
					
				splitedConditions = this.enterExpr_formatExpr(splitedConditions, table);
				
				conditions = splitedConditions.toString().replaceAll(',', ' && ');
				
				query = query.concat(`, where("${conditions}")`);
			}

			this.result.push(query.concat(')'));
			this.sqlStruct = null;

		}
		
	}


	// Enter a parse tree produced by SQLiteParser#use_stmt.
	enterUse_stmt(ctx) {

		this.sqlStruct = this.buildSqlStruct('use');

		ctx.children.forEach(child => {

			switch(child.constructor.name) {

				case 'Schema_nameContext':
					this.sqlStruct.database = child.getText();
					break;
				
				default:
					break;
				
			}

		});

	}

	// Exit a parse tree produced by SQLiteParser#use_stmt.
	exitUse_stmt(ctx) {

		if(this.sqlStruct && this.sqlStruct.command === 'use') {

			const database_name = this.sqlStruct.database;

			this.result.push(`use('${database_name}')`);
			this.sqlStruct = null;

		}

	}


	// Enter a parse tree produced by SQLiteParser#column_name_list.
	enterColumn_name_list(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#column_name_list.
	exitColumn_name_list(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#qualified_table_name.
	enterQualified_table_name(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#qualified_table_name.
	exitQualified_table_name(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#vacuum_stmt.
	enterVacuum_stmt(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#vacuum_stmt.
	exitVacuum_stmt(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#filter_clause.
	enterFilter_clause(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#filter_clause.
	exitFilter_clause(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#window_defn.
	enterWindow_defn(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#window_defn.
	exitWindow_defn(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#over_clause.
	enterOver_clause(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#over_clause.
	exitOver_clause(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#frame_spec.
	enterFrame_spec(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#frame_spec.
	exitFrame_spec(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#frame_clause.
	enterFrame_clause(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#frame_clause.
	exitFrame_clause(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#order_clause.
	enterOrder_clause(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#order_clause.
	exitOrder_clause(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#limit_clause.
	enterLimit_clause(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#limit_clause.
	exitLimit_clause(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#ordering_term.
	enterOrdering_term(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#ordering_term.
	exitOrdering_term(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#asc_desc.
	enterAsc_desc(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#asc_desc.
	exitAsc_desc(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#frame_left.
	enterFrame_left(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#frame_left.
	exitFrame_left(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#frame_right.
	enterFrame_right(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#frame_right.
	exitFrame_right(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#frame_single.
	enterFrame_single(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#frame_single.
	exitFrame_single(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#error_message.
	enterError_message(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#error_message.
	exitError_message(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#filename.
	enterFilename(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#filename.
	exitFilename(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#module_argument.
	enterModule_argument(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#module_argument.
	exitModule_argument(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#module_argument_outer.
	enterModule_argument_outer(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#module_argument_outer.
	exitModule_argument_outer(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#module_argument_inner.
	enterModule_argument_inner(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#module_argument_inner.
	exitModule_argument_inner(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#fallback_excluding_conflicts.
	enterFallback_excluding_conflicts(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#fallback_excluding_conflicts.
	exitFallback_excluding_conflicts(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#join_keyword.
	enterJoin_keyword(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#join_keyword.
	exitJoin_keyword(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#fallback.
	enterFallback(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#fallback.
	exitFallback(ctx) {
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


	// Enter a parse tree produced by SQLiteParser#schema_name.
	enterSchema_name(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#schema_name.
	exitSchema_name(ctx) {
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


	// Enter a parse tree produced by SQLiteParser#column_name.
	enterColumn_name(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#column_name.
	exitColumn_name(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#column_name_excluding_string.
	enterColumn_name_excluding_string(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#column_name_excluding_string.
	exitColumn_name_excluding_string(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#column_alias.
	enterColumn_alias(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#column_alias.
	exitColumn_alias(ctx) {
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


	// Enter a parse tree produced by SQLiteParser#table_alias_excluding_joins.
	enterTable_alias_excluding_joins(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#table_alias_excluding_joins.
	exitTable_alias_excluding_joins(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#window_name.
	enterWindow_name(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#window_name.
	exitWindow_name(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#alias.
	enterAlias(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#alias.
	exitAlias(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#base_window_name.
	enterBase_window_name(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#base_window_name.
	exitBase_window_name(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#table_function_name.
	enterTable_function_name(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#table_function_name.
	exitTable_function_name(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#any_name_excluding_raise.
	enterAny_name_excluding_raise(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#any_name_excluding_raise.
	exitAny_name_excluding_raise(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#any_name_excluding_joins.
	enterAny_name_excluding_joins(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#any_name_excluding_joins.
	exitAny_name_excluding_joins(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#any_name_excluding_string.
	enterAny_name_excluding_string(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#any_name_excluding_string.
	exitAny_name_excluding_string(ctx) {
	}


	// Enter a parse tree produced by SQLiteParser#any_name.
	enterAny_name(ctx) {
	}

	// Exit a parse tree produced by SQLiteParser#any_name.
	exitAny_name(ctx) {
	}



}
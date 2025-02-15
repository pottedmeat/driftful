# Querying in TinyBase

## Overview of TinyBase Queries
TinyBase provides a reactive, in-memory data store with a **query engine** that allows you to select, join, filter, and group tabular data without using SQL. Instead of writing SQL strings, queries are defined through a **typed, programmatic API**. Each query operates on data in a TinyBase **Store** and produces a **Result Table** (a dynamic view of the data) that updates automatically as the underlying data changes. This design ensures high performance and unambiguous composition of query logic, while also enabling reactive updates to drive UIs or other logic.

*Example:*
```javascript
const store = createStore();
const queries = createQueries(store);

queries.setQueryDefinition('activeUsers', 'users', ({ where, select }) => {
  where('status', 'active');
  select('username');
});
```

## Defining Queries with the API
Queries in TinyBase are managed via a `Queries` object associated with a Store. You create a `Queries` object (e.g., via `createQueries(store)`) and then define individual queries using `setQueryDefinition`. Defining a query involves providing a unique query ID, a **root table** (the primary table to query from), and a callback that builds the query using provided keyword functions. The root table serves as the base of the query, and only **left joins** to other tables are allowed (so the query's result never has more rows than the root table). The callback receives an object containing five clause-definition functions to construct the query:

- **Select** – include a specific cell (column) or a computed value in the query result. You can add multiple select clauses to project multiple values into each result row.
- **Join** – bring in columns from another table by linking the root table’s rows to rows in another table, typically via matching row IDs (analogous to a foreign-key join).
- **Where** – filter the rows of the root (or joined) tables based on cell values.
- **Group** – aggregate rows by grouping on a cell’s value.
- **Having** – filter the grouped result rows based on aggregate values.

Each query definition is stored under its ID, and defining a query with an existing ID will overwrite the previous definition. Once defined, the query's result can be accessed through the `Queries` object, appearing as a normal TinyBase table (called a Result Table). For instance, you can retrieve the full result set via `getResultTable(queryId)` or fetch specific result rows or cells through similar getter methods. The query clauses above determine what data appears in the query result.

*Example:*
```javascript
queries.setQueryDefinition('userOrders', 'users', ({ join, select }) => {
  join('orders', 'userId', 'id');
  select('username');
  select('orderTotal');
});
```

## Filtering Data with Where and Having
Filtering in TinyBase queries occurs in two stages: **row filtering** and **group filtering**. The `where` clause performs row filtering on the raw data. It evaluates each row of the root table (or joined tables) and includes only those that satisfy the given condition. You can filter by specifying a cell Id and required value, or by providing a custom evaluation function, to include only rows meeting certain criteria. This is analogous to filtering with a WHERE condition in SQL, acting before any grouping or aggregation.

If the query uses grouping, a second filtering stage can be applied with the `having` clause. The `having` clause filters after grouping and aggregation have been applied. It tests conditions on the aggregated results (for example, only include groups where a count or sum meets a threshold). Rows excluded by the where clause never reach the grouping stage, while the having clause can remove whole groups based on aggregate values. Together, these mechanisms let you precisely control which data ends up in the query’s result.

*Example (Where Clause):*
```javascript
queries.setQueryDefinition('adultUsers', 'users', ({ where, select }) => {
  where('age', age => age >= 18);
  select('username');
});
```

*Example (Having Clause with Grouping):*
```javascript
queries.setQueryDefinition('highValueOrders', 'orders', ({ group, having, select }) => {
  group('customerId');
  select('customerId');
  select('totalSpent'); // assumes an aggregation is defined within select
  having('totalSpent', total => total > 1000);
});
```

## Sorting Query Results
TinyBase queries do not embed an order-by clause in their definitions; instead, sorting is handled when retrieving results. The `getResultSortedRowIds` method returns the IDs of all result rows for a query, sorted by the values of a specified result cell. This function can be used to impose an order on the query output and supports basic pagination parameters. Key aspects of sorting in TinyBase include:

- **Sort Key**: You provide a result cell Id to sort by (e.g., a column from the query result). If no cell Id is given, the result will be sorted by the row Id itself. Sorting is alphanumeric by default on the chosen values.
- **Order**: By default, results are sorted in ascending order. A boolean flag can be passed to request descending order instead.
- **Pagination**: You can supply an `offset` (to skip a number of sorted results) and a `limit` (to cap the number of results returned) for pagination purposes. If not provided, the method returns all sorted row IDs by default.
- **On-Demand Sorting**: Each call to `getResultSortedRowIds` performs a fresh sort of the current result data. The result isn’t cached internally, so if you need to repeatedly access sorted results, you should cache them in your code or use a listener to react to changes (to avoid re-sorting on every access).

*Example:*
```javascript
// Retrieve sorted row IDs for the 'activeUsers' query, sorted by 'username' in descending order, with pagination.
const sortedRowIds = queries.getResultSortedRowIds('activeUsers', 'username', false, 0, 10);
```

## Reactive Query Updates
One of TinyBase’s core strengths is **reactivity**: query results update automatically in response to underlying data changes. Whenever the Store’s data is modified (rows added, cells updated, etc.), any defined queries are **re-evaluated** and their Result Tables are updated behind the scenes. This means the result of a query is always consistent with the current state of the Store, without manual refresh logic. Because queries are reactive, your application can listen to changes on query results and respond optimally – updating only what is necessary in the UI or downstream logic.

TinyBase provides a variety of listener registration methods on the `Queries` object to observe these changes. For example, you can subscribe to changes in an entire query result table (`addResultTableListener`), changes in the sorted order of results (`addResultSortedRowIdsListener`), changes in the count of result rows, or even changes to specific result rows or cells. These callbacks will be invoked whenever the relevant part of the query result changes (due to underlying data edits). By using these listeners, developers can create fine-grained reactive interfaces: for instance, re-render a list only when the sorted order or contents actually change, or update a specific displayed aggregate when its value changes in the query result.

*Example:*
```javascript
queries.addResultTableListener('activeUsers', resultTable => {
  console.log('Updated active users:', resultTable);
});
```

In summary, TinyBase’s querying mechanism is **declarative and reactive**. You define what data to retrieve (select, join), how to filter it (where, having), and then you can retrieve or observe the result. The query system takes care of efficiently recomputing results and notifying listeners whenever the source data changes, all without touching a persistence layer. This allows complex data transformations (similar to SQL queries) to be performed **in-memory and in real-time**, with the predictability of a typed API and the performance benefits of only reacting to actual changes.

---

This version maintains the original report’s dense, high-level focus while integrating concise examples to illustrate key points.
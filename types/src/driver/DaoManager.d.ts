export = DaoManager;
declare class DaoManager {
    /**
     * Object that holds all operator symbols
     */
    static Op: {
        /**
            * Operator -|- (PG range is adjacent to operator)
            *
            * ```js
            * [Op.adjacent]: [1, 2]
            * ```
            * In SQL
            * ```sql
            * -|- [1, 2)
            * ```
            */
        adjacent: symbol;
        /**
         * Operator ALL
         *
         * ```js
         * [Op.gt]: {
         *  [Op.all]: literal('SELECT 1')
         * }
         * ```
         * In SQL
         * ```sql
         * > ALL (SELECT 1)
         * ```
         */
        all: symbol;
        /**
         * Operator AND
         *
         * ```js
         * [Op.and]: {a: 5}
         * ```
         * In SQL
         * ```sql
         * AND (a = 5)
         * ```
         */
        and: symbol;
        /**
         * Operator ANY ARRAY (PG only)
         *
         * ```js
         * [Op.any]: [2,3]
         * ```
         * In SQL
         * ```sql
         * ANY ARRAY[2, 3]::INTEGER
         * ```
         *
         * Operator LIKE ANY ARRAY (also works for iLike and notLike)
         *
         * ```js
         * [Op.like]: { [Op.any]: ['cat', 'hat']}
         * ```
         * In SQL
         * ```sql
         * LIKE ANY ARRAY['cat', 'hat']
         * ```
         */
        any: symbol;
        /**
         * Operator BETWEEN
         *
         * ```js
         * [Op.between]: [6, 10]
         * ```
         * In SQL
         * ```sql
         * BETWEEN 6 AND 10
         * ```
         */
        between: symbol;
        /**
         * With dialect specific column identifiers (PG in this example)
         *
         * ```js
         * [Op.col]: 'user.organization_id'
         * ```
         * In SQL
         * ```sql
         * = "user"."organization_id"
         * ```
         */
        col: symbol;
        /**
         * Operator < @ (PG array contained by operator)
         *
         * ```js
         * [Op.contained]: [1, 2]
         * ```
         * In SQL
         * ```sql
         * < @ [1, 2)
         * ```
         */
        contained: symbol;
        /**
         * Operator @ > (PG array contains operator)
         *
         * ```js
         * [Op.contains]: [1, 2]
         * ```
         * In SQL
         * ```sql
         * - @ > [1, 2)
         * ```
         */
        contains: symbol;
        /**
         * Operator LIKE
         *
         * ```js
         * [Op.endsWith]: 'hat'
         * ```
         * In SQL
         * ```sql
         * LIKE '%hat'
         * ```
         */
        endsWith: symbol;
        /**
         * Operator =
         *
         * ```js
         * [Op.eq]: 3
         * ```
         * In SQL
         * ```sql
         * = 3
         * ```
         */
        eq: symbol;
        /**
         * Operator >
         *
         * ```js
         * [Op.gt]: 6
         * ```
         * In SQL
         * ```sql
         * > 6
         * ```
         */
        gt: symbol;
        /**
         * Operator >=
         *
         * ```js
         * [Op.gte]: 6
         * ```
         * In SQL
         * ```sql
         * >= 6
         * ```
         */
        gte: symbol;
        /**
         * Operator ILIKE (case insensitive) (PG only)
         *
         * ```js
         * [Op.iLike]: '%hat'
         * ```
         * In SQL
         * ```sql
         * ILIKE '%hat'
         * ```
         */
        iLike: symbol;
        /**
         * Operator IN
         *
         * ```js
         * [Op.in]: [1, 2]
         * ```
         * In SQL
         * ```sql
         * IN [1, 2]
         * ```
         */
        in: symbol;
        /**
         * Operator ~* (PG only)
         *
         * ```js
         * [Op.iRegexp]: '^[h|a|t]'
         * ```
         * In SQL
         * ```sql
         * ~* '^[h|a|t]'
         * ```
         */
        iRegexp: symbol;
        /**
         * Operator IS
         *
         * ```js
         * [Op.is]: null
         * ```
         * In SQL
         * ```sql
         * IS null
         * ```
         */
        is: symbol;
        /**
         * Operator LIKE
         *
         * ```js
         * [Op.like]: '%hat'
         * ```
         * In SQL
         * ```sql
         * LIKE '%hat'
         * ```
         */
        like: symbol;
        /**
         * Operator <
         *
         * ```js
         * [Op.lt]: 10
         * ```
         * In SQL
         * ```sql
         * < 10
         * ```
         */
        lt: symbol;
        /**
         * Operator <=
         *
         * ```js
         * [Op.lte]: 10
         * ```
         * In SQL
         * ```sql
         * <= 10
         * ```
         */
        lte: symbol;
        /**
         * Operator !=
         *
         * ```js
         * [Op.ne]: 20
         * ```
         * In SQL
         * ```sql
         * != 20
         * ```
         */
        ne: symbol;
        /**
         * Operator &> (PG range does not extend to the left of operator)
         *
         * ```js
         * [Op.noExtendLeft]: [1, 2]
         * ```
         * In SQL
         * ```sql
         * &> [1, 2)
         * ```
         */
        noExtendLeft: symbol;
        /**
         * Operator &< (PG range does not extend to the right of operator)
         *
         * ```js
         * [Op.noExtendRight]: [1, 2]
         * ```
         * In SQL
         * ```sql
         * &< [1, 2)
         * ```
         */
        noExtendRight: symbol;
        /**
         * Operator NOT
         *
         * ```js
         * [Op.not]: true
         * ```
         * In SQL
         * ```sql
         * IS NOT TRUE
         * ```
         */
        not: symbol;
        /**
         * Operator NOT BETWEEN
         *
         * ```js
         * [Op.notBetween]: [11, 15]
         * ```
         * In SQL
         * ```sql
         * NOT BETWEEN 11 AND 15
         * ```
         */
        notBetween: symbol;
        /**
         * Operator NOT ILIKE (case insensitive) (PG only)
         *
         * ```js
         * [Op.notILike]: '%hat'
         * ```
         * In SQL
         * ```sql
         * NOT ILIKE '%hat'
         * ```
         */
        notILike: symbol;
        /**
         * Operator NOT IN
         *
         * ```js
         * [Op.notIn]: [1, 2]
         * ```
         * In SQL
         * ```sql
         * NOT IN [1, 2]
         * ```
         */
        notIn: symbol;
        /**
         * Operator !~* (PG only)
         *
         * ```js
         * [Op.notIRegexp]: '^[h|a|t]'
         * ```
         * In SQL
         * ```sql
         * !~* '^[h|a|t]'
         * ```
         */
        notIRegexp: symbol;
        /**
         * Operator NOT LIKE
         *
         * ```js
         * [Op.notLike]: '%hat'
         * ```
         * In SQL
         * ```sql
         * NOT LIKE '%hat'
         * ```
         */
        notLike: symbol;
        /**
         * Operator NOT REGEXP (MySQL/PG only)
         *
         * ```js
         * [Op.notRegexp]: '^[h|a|t]'
         * ```
         * In SQL
         * ```sql
         * NOT REGEXP/!~ '^[h|a|t]'
         * ```
         */
        notRegexp: symbol;
        /**
         * Operator OR
         *
         * ```js
         * [Op.or]: [{a: 5}, {a: 6}]
         * ```
         * In SQL
         * ```sql
         * (a = 5 OR a = 6)
         * ```
         */
        or: symbol;
        /**
         * Operator && (PG array overlap operator)
         *
         * ```js
         * [Op.overlap]: [1, 2]
         * ```
         * In SQL
         * ```sql
         * && [1, 2)
         * ```
         */
        overlap: symbol;
        /**
         * Internal placeholder
         *
         * ```js
         * [Op.placeholder]: true
         * ```
         */
        placeholder: symbol;
        /**
         * Operator REGEXP (MySQL/PG only)
         *
         * ```js
         * [Op.regexp]: '^[h|a|t]'
         * ```
         * In SQL
         * ```sql
         * REGEXP/~ '^[h|a|t]'
         * ```
         */
        regexp: symbol;
        /**
         * Operator LIKE
         *
         * ```js
         * [Op.startsWith]: 'hat'
         * ```
         * In SQL
         * ```sql
         * LIKE 'hat%'
         * ```
         */
        startsWith: symbol;
        /**
         * Operator << (PG range strictly left of operator)
         *
         * ```js
         * [Op.strictLeft]: [1, 2]
         * ```
         * In SQL
         * ```sql
         * << [1, 2)
         * ```
         */
        strictLeft: symbol;
        /**
         * Operator >> (PG range strictly right of operator)
         *
         * ```js
         * [Op.strictRight]: [1, 2]
         * ```
         * In SQL
         * ```sql
         * >> [1, 2)
         * ```
         */
        strictRight: symbol;
        /**
         * Operator LIKE
         *
         * ```js
         * [Op.substring]: 'hat'
         * ```
         * In SQL
         * ```sql
         * LIKE '%hat%'
         * ```
         */
        substring: symbol;
        /**
         * Operator VALUES
         *
         * ```js
         * [Op.values]: [4, 5, 6]
         * ```
         * In SQL
         * ```sql
         * VALUES (4), (5), (6)
         * ```
         */
        values: symbol;
    };
    authenticate(): void;
    close(): void;
    query(): void;
}

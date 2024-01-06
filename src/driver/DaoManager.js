class DaoManager {

    authenticate() { }
    close() { }
    query() { }

    /**
     * Object that holds all operator symbols
     */
    static Op = {
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
        adjacent: Symbol('adjacent'),
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
        all: Symbol('all'),
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
        and: Symbol('and'),
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
        any: Symbol('any'),
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
        between: Symbol('between'),
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
        col: Symbol('col'),
        /**
         * Operator <@ (PG array contained by operator)
         *
         * ```js
         * [Op.contained]: [1, 2]
         * ```
         * In SQL
         * ```sql
         * <@ [1, 2)
         * ```
         */
        contained: Symbol('contained'),
        /**
         * Operator @> (PG array contains operator)
         *
         * ```js
         * [Op.contains]: [1, 2]
         * ```
         * In SQL
         * ```sql
         * @> [1, 2)
         * ```
         */
        contains: Symbol('contains'),
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
        endsWith: Symbol('endsWith'),
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
        eq: Symbol('eq'),
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
        gt: Symbol('gt'),
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
        gte: Symbol('gte'),

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
        iLike: Symbol('iLike'),
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
        in: Symbol('in'),
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
        iRegexp: Symbol('iRegexp'),
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
        is: Symbol('is'),
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
        like: Symbol('like'),
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
        lt: Symbol('lt'),
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
        lte: Symbol('lte'),
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
        ne: Symbol('ne'),
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
        noExtendLeft: Symbol('noExtendLeft'),
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
        noExtendRight: Symbol('noExtendRight'),
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
        not: Symbol('not'),
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
        notBetween: Symbol('notBetween'),
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
        notILike: Symbol('notILike'),
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
        notIn: Symbol('notIn'),
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
        notIRegexp: Symbol('notIRegexp'),
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
        notLike: Symbol('notLike'),
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
        notRegexp: Symbol('notRegexp'),
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
        or: Symbol('or'),
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
        overlap: Symbol('overlap'),
        /**
         * Internal placeholder 
         *
         * ```js
         * [Op.placeholder]: true
         * ```
         */
        placeholder: Symbol('placeholder'),
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
        regexp: Symbol('regexp'),
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
        startsWith: Symbol('startsWith'),
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
        strictLeft: Symbol('strictLeft'),
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
        strictRight: Symbol('strictRight'),
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
        substring: Symbol('substring'),
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
        values: Symbol('values')
    }
}
module.exports = DaoManager;
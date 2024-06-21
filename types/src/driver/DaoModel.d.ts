export = DaoModel;
declare class DaoModel {
    /**
     * @param {*} data
     */
    constructor(data: any);
    dataValue: any;
    data: any[];
    /**
     * @param {*} obj
     * @param {*} where
     * @returns
     */
    check(obj: any, where: any): boolean;
    /**
     * @param {*} id
     * @returns {*}
     */
    findByPk(id: any): any;
    /**
     * @param {*} param
     * @returns {*}
     */
    findOne({ where }: any): any;
    /**
     * @param {*} param
     * @returns {*}
     */
    findAll({ where }: any): any;
    /**
     * @param {*} options
     * @returns {*}
     */
    findAndCountAll(options: any): any;
    /**
     * @param {*} data
     * @returns {*}
     */
    bulkCreate(data: any): any;
    /**
     * @param {*} options
     * @returns {*}
     */
    count(options: any): any;
    /**
     * @param {*} data
     */
    update(data: any): any;
    /**
     * @param {*} data
     */
    create(data: any): void;
    /**
     * @param {*} data
     */
    destroy({ where }: any): any;
    getTableName(): string;
    /**
     * @param {*} options
     */
    save(options: any): any;
    toJSON(): void;
}

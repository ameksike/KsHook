export = DaoModel;
declare class DaoModel {
    constructor(data: any);
    dataValue: any;
    data: any[];
    check(obj: any, where: any): boolean;
    findByPk(id: any): Promise<any>;
    findOne({ where }: {
        where: any;
    }): Promise<any>;
    findAll({ where }: {
        where: any;
    }): Promise<any[]>;
    findAndCountAll(options: any): void;
    bulkCreate(data: any): void;
    count(options: any): void;
    update(data: any): void;
    create(data: any): void;
    destroy({ where }: {
        where: any;
    }): void;
    getTableName(): string;
    save(options: any): void;
    toJSON(): void;
}

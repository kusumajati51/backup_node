export interface IPhotoProduct {
    id: number;
    name: string;
    path: string;
    is_selected: boolean;
    product_id: number;
    created_at: string;
    updated_at: string;
    mimetype: string;
}

export class PhotoProduct implements IPhotoProduct {
    id: number;
    name: string;
    path: string;
    is_selected: boolean;
    product_id: number;
    created_at: string;
    updated_at: string;
    mimetype: string;

    constructor(data: IPhotoProduct) {
        this.id = data.id;
        this.name = data.name;
        this.path = data.path;
        this.is_selected = data.is_selected;
        this.product_id = data.product_id;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.mimetype = data.mimetype;
    }
}
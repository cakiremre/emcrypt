import { Base, Language } from "src/app/common/models/model";

export enum Type {
    REGULAR
}

export class Content extends Base {
    missing: boolean;
    selected: boolean;
    type: Type;
    html: Map<Language, string> = new Map();

    init(_content: Content){
        super.init(_content);

        this.missing = _content.missing;
        this.type = _content.type;
        this.html = _content.html;
    }
}
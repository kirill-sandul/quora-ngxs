export namespace TagsActions {
  interface ISelectTags {
    push?: boolean
  }

  interface IAddTag {
    name: string,
    description: string
  }

  export class SelectTags {
    static readonly type = '[tags]:select_tags'
    constructor(public payload: ISelectTags = { push: false }) {}
  }

  export class AddTag {
    static readonly type = '[tags]:add'
    constructor(public payload: IAddTag) {}
  }

  export class SelectTag {
    static readonly type = '[tags]:select_tag'
    constructor(public payload: string) {}
  }

  export class Search {
    static readonly type = '[tags]:search';
    constructor(public payload: string) { }
  }
}
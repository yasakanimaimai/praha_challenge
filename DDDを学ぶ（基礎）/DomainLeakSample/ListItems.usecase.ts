// @ts-nocheck
export class ListItems {
  constructor(private readonly itemRepository: ItemRepository) {}
  execute(): Item[] {
    const items = this.itemRepository.listItems()
    // itemがstatusにACTIVEを持っていることを知っている
    // itemのリストを取得する際にstatusがACTIVEのもので暗黙的にフィルターをかけている
    return items.filter(({ status }) => status === "ACTIVE")
  }
}

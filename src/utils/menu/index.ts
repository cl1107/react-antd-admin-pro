import { MenusItem } from '@/store/useTabsStore';

/**
 * 菜单搜索
 * @param {string} name 搜索值
 * @param {Array} menu 菜单
 * @returns
 */
export const findMenuItem = (name: string, menu: MenusItem[]) => {
  function findItemNameAndReturnNamePath(
    tree: MenusItem,
    treeName: string,
  ): { name: string; path: string }[] {
    let result = [];
    // 即可以通过key来查找也可以通过name查找
    if (tree.label.indexOf(treeName) > -1 || tree.key.indexOf(treeName) > -1) {
      if (tree.key) {
        result.push({ name: tree.label, path: tree.key });
      }
    }

    let res;
    if (tree.children) {
      for (let i = 0; i < tree.children.length; i++) {
        res = findItemNameAndReturnNamePath(tree.children[i], treeName);
        if (res) {
          result = result.concat(res);
          // return result;
        }
      }
    }
    return result;
  }
  const result = [];
  for (let i = 0; i < menu.length; i++) {
    const item = menu[i];
    const res = findItemNameAndReturnNamePath(item, name);
    if (res.length > 0) {
      result.push(...res);
    }
  }
  return result;
};

/**
 * 寻找子菜单第一个path和name
 * @param {Array} menu
 * @returns
 */
export const findNestedChildrenFirstKeyAndLabel = (
  menu: MenusItem | undefined,
): { label: string; key: string } => {
  if (!menu) {
    return { label: '', key: '' };
  }
  if (menu.key) {
    return {
      label: menu.label,
      key: menu.key,
    };
  }
  return findNestedChildrenFirstKeyAndLabel(menu?.children?.[0]);
};

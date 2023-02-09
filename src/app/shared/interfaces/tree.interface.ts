export interface TreeItem{
    name: string;
    expanded?: boolean;
    children?: TreeItem[];
    visible?: boolean;
}

export type TreeItems = TreeItem[];

export enum ToggleTypes {
    collapseAll = 0,
    expandAll = 1
}
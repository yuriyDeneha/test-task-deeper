import { TreeItems } from "../shared/interfaces/tree.interface";

export const items: TreeItems = [
  {
    visible: true,
    name: "Deepersignals",
    children: [
      {
        visible: true,
        name: 'Apple',
        children: [
          {
            visible: true,
            name: 'Iphone',
          },
          {
            visible: true,
            name: 'MacBook',
            children: [
              {
                visible: true,
                name: 'M1',
              },
              {
                visible: true,
                name: 'M2',
              },
              {
                visible: true,
                name: 'M3',
                children: [{
                  visible: true,
                  name: '15,8*1sec.',
                }]
              }
            ]
          }
        ]
      },
      {
        visible: true,
        name: 'Microsoft',
        children: [
          {
            visible: true,
            name: 'Xbox',
          },

          {
            visible: true,
            name: 'Windows',
          }
        ]
      }
    ]
  }
];
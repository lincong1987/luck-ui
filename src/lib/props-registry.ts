import type { Locale } from "./i18n";

export interface PropDef {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
}

export interface ComponentPropsEntry {
  props: PropDef[];
  extends?: {
    name: string;
    href: string;
  };
}

const propDescriptionsZh = new Map<string, string>([
  ["Size of the avatar.", "头像尺寸。"],
  ["Visual style of the button.", "按钮的视觉样式。"],
  ["Size of the button.", "按钮尺寸。"],
  ["When true, shows a spinner and disables the button.", "为 true 时显示加载指示器并禁用按钮。"],
  [
    "Props forwarded to the underlying Positioner component. Includes align, side, sideOffset, alignOffset, collisionPadding, etc.",
    "透传给底层 Positioner 组件的属性，包括 align、side、sideOffset、alignOffset、collisionPadding 等。",
  ],
  ["Visual style of the menu item.", "菜单项的视觉样式。"],
  [
    "Custom element or render function used instead of the default span container.",
    "用于替代默认 span 容器的自定义元素或渲染函数。",
  ],
  ["Visual style of the trigger button.", "触发按钮的视觉样式。"],
  ["Size of the trigger button.", "触发按钮的尺寸。"],
  ["Props forwarded to the underlying List component.", "透传给底层 List 组件的属性。"],
  ["Visual style of the toggle.", "开关的视觉样式。"],
  ["Size of the toggle.", "开关的尺寸。"],
  ["Visual style of the tag.", "标签的视觉样式。"],
  ["Size of the tag.", "标签的尺寸。"],
  ["Visual style of the input.", "输入框的视觉样式。"],
  ["When true, the input stretches to fill its container.", "为 true 时输入框拉伸以填满容器。"],
  ["Visual style of the textarea.", "多行文本输入框的视觉样式。"],
  [
    "When true, the textarea stretches to fill its container.",
    "为 true 时多行文本输入框拉伸以填满容器。",
  ],
  ["Layout direction of the grouped buttons.", "按钮组的布局方向。"],
  ["Orientation of the separator within the group.", "分隔线在组内的方向。"],
  ["Render the text as a custom element instead of a div.", "将文本渲染为自定义元素而非 div。"],
  ["Visual placement of the addon inside the input group.", "附加内容在输入框组中的位置。"],
  ["Compact button size for use inside an input group.", "输入框组内使用的紧凑按钮尺寸。"],
  ["Props forwarded to the underlying Portal component.", "透传给底层 Portal 组件的属性。"],
  ["Props forwarded to the underlying Backdrop component.", "透传给底层 Backdrop 组件的属性。"],
  ["Whether to show the default close button in the header.", "是否在头部显示默认关闭按钮。"],
  ["Additional CSS classes to apply to the header container.", "应用于头部容器的额外 CSS 类。"],
  ["Additional CSS classes to apply to the body container.", "应用于主体容器的额外 CSS 类。"],
  ["Layout direction for the footer actions.", "底部操作区的布局方向。"],
  ["Additional CSS classes to apply to the footer container.", "应用于底部容器的额外 CSS 类。"],
  ["Additional CSS classes to apply to the description element.", "应用于描述元素的额外 CSS 类。"],
  ["Additional CSS classes to apply to the backdrop element.", "应用于遮罩元素的额外 CSS 类。"],
  [
    "The edge of the screen the drawer is anchored to. The swipe direction is derived from this automatically.",
    "抽屉吸附的屏幕边缘，滑动方向会据此自动推导。",
  ],
  ["Overrides the position inherited from the parent Drawer.", "覆盖从父级 Drawer 继承的位置。"],
  [
    "Use `inset` to float the drawer away from the screen edges.",
    "使用 `inset` 让抽屉悬浮并远离屏幕边缘。",
  ],
  ["Whether to render a drag handle bar on the swipe edge.", "是否在滑动边缘渲染拖拽条。"],
  ["Whether to render a close button in the top-right corner.", "是否在右上角渲染关闭按钮。"],
  [
    "Whether to wrap the body in a scroll area for overflowing content.",
    "是否将主体放入滚动区域以容纳溢出内容。",
  ],
  ["Additional CSS classes to apply to the drag bar.", "应用于拖拽条的额外 CSS 类。"],
  ["Additional CSS classes to apply to the card container.", "应用于卡片容器的额外 CSS 类。"],
  ["Additional CSS classes to apply to the title element.", "应用于标题元素的额外 CSS 类。"],
  ["Additional CSS classes to apply to the action container.", "应用于操作区的额外 CSS 类。"],
  ["Additional CSS classes to apply to the panel container.", "应用于面板容器的额外 CSS 类。"],
  ["Layout direction for the footer content.", "底部内容的布局方向。"],
  ["Visual style of the tabs list.", "标签页列表的视觉样式。"],
  ["Size of the tabs and indicator.", "标签页和指示器的尺寸。"],
  [
    "Override the tab size. Inherits from TabsList by default.",
    "覆盖标签页尺寸，默认继承自 TabsList。",
  ],
  ["Props forwarded to the underlying Viewport component.", "透传给底层 Viewport 组件的属性。"],
  ["Orientation of the scrollbar.", "滚动条的方向。"],
  [
    "What opens the list while typing. A string or array of strings opens it when the value starts with one of them; a matcher function returns the matched segment or null. See createCommandTrigger.",
    "输入时打开列表的触发方式。字符串或字符串数组会在值以其中之一开头时打开列表；匹配函数返回匹配到的片段或 null。参见 createCommandTrigger。",
  ],
  [
    "Matches an item against the query typed after the trigger. Defaults to a locale-aware contains match.",
    "将选项与触发符之后输入的查询进行匹配，默认按语言区域进行包含匹配。",
  ],
  ["The input value. Use when controlled.", "输入框的值，用于受控模式。"],
  ["The uncontrolled input value when initially rendered.", "首次渲染时的非受控输入值。"],
  ["Called when the input value changes.", "输入值变化时调用。"],
  [
    "Called when a command is selected with the pointer or the confirm key. The trigger segment is removed from the input before this fires; details.value is the resulting input value.",
    "通过指针或确认键选择命令时调用。触发前会从输入中移除触发片段；details.value 为处理后的输入值。",
  ],
  ["Which key confirms the highlighted command.", "确认高亮命令的按键。"],
  ["Whether the first matching item is highlighted automatically.", "是否自动高亮第一个匹配项。"],
  [
    "Render an InputGroupTextarea instead of an InputGroupInput.",
    "渲染 InputGroupTextarea 而非 InputGroupInput。",
  ],
  [
    "Custom element to render as the input. Defaults to InputGroupInput, or InputGroupTextarea when multiline is set.",
    "作为输入框渲染的自定义元素，默认为 InputGroupInput；设置 multiline 时则为 InputGroupTextarea。",
  ],
  [
    "Props forwarded to the underlying Positioner. Defaults to side top, align start, anchored to the closest InputGroup.",
    "透传给底层 Positioner 的属性。默认 side 为 top、align 为 start，并锚定到最近的 InputGroup。",
  ],
  ["Additional classes for the label.", "标签的额外类名。"],
  [
    "Additional classes for the muted description shown after the label.",
    "标签后显示的弱化描述的额外类名。",
  ],
  [
    "Additional classes for the trailing shortcut slot. Place Kbd elements inside.",
    "尾部快捷键区域的额外类名，可在其中放置 Kbd 元素。",
  ],
  ["The character(s) that open the list.", "打开列表的字符。"],
  [
    "start matches only when the whole value starts with the trigger; anywhere matches the trigger after whitespace before the caret.",
    "start 仅在整段值以触发符开头时匹配；anywhere 会在光标前的空白之后匹配触发符。",
  ],
  [
    "Additional classes for the addon container, used for leading/trailing icons.",
    "附加内容容器的额外类名，用于前置或后置图标。",
  ],
  ["Controls the height and text size of the field.", "控制字段的高度和文字大小。"],
  [
    "Whether to show the clear button. Hidden automatically when children are provided.",
    "是否显示清除按钮；提供 children 时会自动隐藏。",
  ],
  ["Whether to show the dropdown trigger button.", "是否显示下拉触发按钮。"],
  ["Whether to show the remove button on the chip.", "是否在 Chip 上显示移除按钮。"],
  ["Placement of the toast stack on the screen.", "Toast 在屏幕上的堆叠位置。"],
  ["Delay in milliseconds before the tooltip opens.", "工具提示打开前的延迟，单位为毫秒。"],
  ["The orientation of the separator.", "分隔线的方向。"],
  ["Additional CSS classes to apply to the keyboard key.", "应用于键盘按键的额外 CSS 类。"],
  ["Additional CSS classes to apply to the keyboard key group.", "应用于键盘按键组的额外 CSS 类。"],
]);

export function localizePropDescription(description: string, locale: Locale): string {
  if (locale === "en") return description;

  return propDescriptionsZh.get(description) ?? description;
}

export const propsRegistry: Record<string, ComponentPropsEntry> = {
  Accordion: {
    extends: {
      name: "Base UI Accordion.Root",
      href: "https://base-ui.com/react/components/accordion#api-reference",
    },
    props: [],
  },
  AccordionItem: {
    extends: {
      name: "Base UI Accordion.Item",
      href: "https://base-ui.com/react/components/accordion#api-reference",
    },
    props: [],
  },
  AccordionTrigger: {
    extends: {
      name: "Base UI Accordion.Trigger",
      href: "https://base-ui.com/react/components/accordion#api-reference",
    },
    props: [],
  },
  AccordionContent: {
    extends: {
      name: "Base UI Accordion.Panel",
      href: "https://base-ui.com/react/components/accordion#api-reference",
    },
    props: [],
  },
  Avatar: {
    extends: {
      name: "Base UI Avatar.Root",
      href: "https://base-ui.com/react/components/avatar#api-reference",
    },
    props: [
      {
        name: "size",
        type: '"sm" | "default" | "lg"',
        defaultValue: '"default"',
        description: "Size of the avatar.",
      },
    ],
  },
  AvatarImage: {
    extends: {
      name: "Base UI Avatar.Image",
      href: "https://base-ui.com/react/components/avatar#api-reference",
    },
    props: [],
  },
  AvatarFallback: {
    extends: {
      name: "Base UI Avatar.Fallback",
      href: "https://base-ui.com/react/components/avatar#api-reference",
    },
    props: [],
  },
  Button: {
    extends: {
      name: "Base UI Button",
      href: "https://base-ui.com/react/components/button",
    },
    props: [
      {
        name: "variant",
        type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "destructive-outline" | "invert"',
        defaultValue: '"default"',
        description: "Visual style of the button.",
      },
      {
        name: "size",
        type: '"default" | "sm" | "lg" | "icon" | "icon-sm"',
        defaultValue: '"default"',
        description: "Size of the button.",
      },
      {
        name: "loading",
        type: "boolean",
        defaultValue: "false",
        description: "When true, shows a spinner and disables the button.",
      },
    ],
  },
  Menu: {
    extends: {
      name: "Base UI Menu.Root",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  MenuTrigger: {
    extends: {
      name: "Base UI Menu.Trigger",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  MenuContent: {
    extends: {
      name: "Base UI Menu.Popup",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [
      {
        name: "positionerProps",
        type: "BaseMenu.Positioner.Props",
        description:
          "Props forwarded to the underlying Positioner component. Includes align, side, sideOffset, alignOffset, collisionPadding, etc.",
      },
    ],
  },
  MenuItem: {
    extends: {
      name: "Base UI Menu.Item",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [
      {
        name: "variant",
        type: '"default" | "destructive"',
        defaultValue: '"default"',
        description: "Visual style of the menu item.",
      },
    ],
  },
  MenuLinkItem: {
    extends: {
      name: "Base UI Menu.LinkItem",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [
      {
        name: "variant",
        type: '"default" | "destructive"',
        defaultValue: '"default"',
        description: "Visual style of the menu item.",
      },
    ],
  },
  MenuGroup: {
    extends: {
      name: "Base UI Menu.Group",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  MenuGroupLabel: {
    extends: {
      name: "Base UI Menu.GroupLabel",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  MenuSeparator: {
    extends: {
      name: "Base UI Menu.Separator",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  MenuItemAddon: {
    props: [
      {
        name: "render",
        type: "React.ReactElement | ((props, state) => React.ReactElement)",
        description:
          "Custom element or render function used instead of the default span container.",
      },
    ],
  },
  MenuItemLabel: {
    props: [
      {
        name: "render",
        type: "React.ReactElement | ((props, state) => React.ReactElement)",
        description:
          "Custom element or render function used instead of the default span container.",
      },
    ],
  },
  MenuSubmenu: {
    extends: {
      name: "Base UI Menu.SubmenuRoot",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  MenuSubmenuTrigger: {
    extends: {
      name: "Base UI Menu.SubmenuTrigger",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  MenuRadioGroup: {
    extends: {
      name: "Base UI Menu.RadioGroup",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  MenuRadioItem: {
    extends: {
      name: "Base UI Menu.RadioItem",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  MenuCheckboxItem: {
    extends: {
      name: "Base UI Menu.CheckboxItem",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  MenuRadioItemIndicator: {
    extends: {
      name: "Base UI Menu.RadioItemIndicator",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  MenuCheckboxItemIndicator: {
    extends: {
      name: "Base UI Menu.CheckboxItemIndicator",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  ContextMenu: {
    extends: {
      name: "Base UI ContextMenu.Root",
      href: "https://base-ui.com/react/components/context-menu#api-reference",
    },
    props: [],
  },
  ContextMenuTrigger: {
    extends: {
      name: "Base UI ContextMenu.Trigger",
      href: "https://base-ui.com/react/components/context-menu#api-reference",
    },
    props: [],
  },
  ContextMenuContent: {
    extends: {
      name: "Base UI ContextMenu.Popup",
      href: "https://base-ui.com/react/components/context-menu#api-reference",
    },
    props: [
      {
        name: "positionerProps",
        type: "BaseContextMenu.Positioner.Props",
        description:
          "Props forwarded to the underlying Positioner component. Includes align, side, sideOffset, alignOffset, collisionPadding, etc.",
      },
    ],
  },
  ContextMenuItem: {
    extends: {
      name: "Base UI ContextMenu.Item",
      href: "https://base-ui.com/react/components/context-menu#api-reference",
    },
    props: [
      {
        name: "variant",
        type: '"default" | "destructive"',
        defaultValue: '"default"',
        description: "Visual style of the menu item.",
      },
    ],
  },
  ContextMenuLinkItem: {
    extends: {
      name: "Base UI ContextMenu.LinkItem",
      href: "https://base-ui.com/react/components/context-menu#api-reference",
    },
    props: [
      {
        name: "variant",
        type: '"default" | "destructive"',
        defaultValue: '"default"',
        description: "Visual style of the menu item.",
      },
    ],
  },
  ContextMenuGroup: {
    extends: {
      name: "Base UI ContextMenu.Group",
      href: "https://base-ui.com/react/components/context-menu#api-reference",
    },
    props: [],
  },
  ContextMenuGroupLabel: {
    extends: {
      name: "Base UI ContextMenu.GroupLabel",
      href: "https://base-ui.com/react/components/context-menu#api-reference",
    },
    props: [],
  },
  ContextMenuSeparator: {
    extends: {
      name: "Base UI ContextMenu.Separator",
      href: "https://base-ui.com/react/components/context-menu#api-reference",
    },
    props: [],
  },
  ContextMenuItemAddon: {
    props: [
      {
        name: "render",
        type: "React.ReactElement | ((props, state) => React.ReactElement)",
        description:
          "Custom element or render function used instead of the default span container.",
      },
    ],
  },
  ContextMenuItemLabel: {
    props: [
      {
        name: "render",
        type: "React.ReactElement | ((props, state) => React.ReactElement)",
        description:
          "Custom element or render function used instead of the default span container.",
      },
    ],
  },
  ContextMenuSubmenu: {
    extends: {
      name: "Base UI ContextMenu.SubmenuRoot",
      href: "https://base-ui.com/react/components/context-menu#api-reference",
    },
    props: [],
  },
  ContextMenuSubmenuTrigger: {
    extends: {
      name: "Base UI ContextMenu.SubmenuTrigger",
      href: "https://base-ui.com/react/components/context-menu#api-reference",
    },
    props: [],
  },
  ContextMenuRadioGroup: {
    extends: {
      name: "Base UI ContextMenu.RadioGroup",
      href: "https://base-ui.com/react/components/context-menu#api-reference",
    },
    props: [],
  },
  ContextMenuRadioItem: {
    extends: {
      name: "Base UI ContextMenu.RadioItem",
      href: "https://base-ui.com/react/components/context-menu#api-reference",
    },
    props: [],
  },
  ContextMenuCheckboxItem: {
    extends: {
      name: "Base UI ContextMenu.CheckboxItem",
      href: "https://base-ui.com/react/components/context-menu#api-reference",
    },
    props: [],
  },
  Select: {
    extends: {
      name: "Base UI Select.Root",
      href: "https://base-ui.com/react/components/select#api-reference",
    },
    props: [],
  },
  SelectTrigger: {
    extends: {
      name: "Base UI Select.Trigger",
      href: "https://base-ui.com/react/components/select#api-reference",
    },
    props: [
      {
        name: "variant",
        type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "destructive-outline" | "invert"',
        defaultValue: '"outline"',
        description: "Visual style of the trigger button.",
      },
      {
        name: "size",
        type: '"default" | "sm" | "lg" | "icon" | "icon-sm"',
        defaultValue: '"default"',
        description: "Size of the trigger button.",
      },
    ],
  },
  SelectContent: {
    extends: {
      name: "Base UI Select.Popup",
      href: "https://base-ui.com/react/components/select#api-reference",
    },
    props: [
      {
        name: "positionerProps",
        type: "BaseSelect.Positioner.Props",
        description:
          "Props forwarded to the underlying Positioner component. Includes align, side, sideOffset, alignOffset, collisionPadding, etc.",
      },
      {
        name: "listProps",
        type: "BaseSelect.List.Props",
        description: "Props forwarded to the underlying List component.",
      },
    ],
  },
  SelectItem: {
    extends: {
      name: "Base UI Select.Item",
      href: "https://base-ui.com/react/components/select#api-reference",
    },
    props: [],
  },
  SelectValue: {
    extends: {
      name: "Base UI Select.Value",
      href: "https://base-ui.com/react/components/select#api-reference",
    },
    props: [],
  },
  SelectSeparator: {
    extends: {
      name: "Base UI Select.Separator",
      href: "https://base-ui.com/react/components/select#api-reference",
    },
    props: [],
  },
  Slider: {
    extends: {
      name: "Base UI Slider.Root",
      href: "https://base-ui.com/react/components/slider#api-reference",
    },
    props: [],
  },
  Switch: {
    extends: {
      name: "Base UI Switch.Root",
      href: "https://base-ui.com/react/components/switch#api-reference",
    },
    props: [],
  },
  Toggle: {
    extends: {
      name: "Base UI Toggle",
      href: "https://base-ui.com/react/components/toggle",
    },
    props: [
      {
        name: "variant",
        type: '"default"',
        defaultValue: '"default"',
        description: "Visual style of the toggle.",
      },
      {
        name: "size",
        type: '"default" | "sm" | "lg"',
        defaultValue: '"default"',
        description: "Size of the toggle.",
      },
    ],
  },
  Tag: {
    props: [
      {
        name: "variant",
        type: '"default" | "outline" | "secondary"',
        defaultValue: '"default"',
        description: "Visual style of the tag.",
      },
      {
        name: "size",
        type: '"default" | "sm" | "lg"',
        defaultValue: '"default"',
        description: "Size of the tag.",
      },
    ],
  },
  Input: {
    extends: {
      name: "Base UI Input",
      href: "https://base-ui.com/react/components/input",
    },
    props: [
      {
        name: "variant",
        type: '"default" | "outline"',
        defaultValue: '"default"',
        description: "Visual style of the input.",
      },
      {
        name: "block",
        type: "boolean",
        defaultValue: "true",
        description: "When true, the input stretches to fill its container.",
      },
    ],
  },
  Textarea: {
    extends: {
      name: "Base UI Textarea",
      href: "https://base-ui.com/react/components/textarea",
    },
    props: [
      {
        name: "variant",
        type: '"default" | "outline"',
        defaultValue: '"default"',
        description: "Visual style of the textarea.",
      },
      {
        name: "block",
        type: "boolean",
        defaultValue: "true",
        description: "When true, the textarea stretches to fill its container.",
      },
    ],
  },
  ButtonGroup: {
    props: [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: '"horizontal"',
        description: "Layout direction of the grouped buttons.",
      },
    ],
  },
  ButtonGroupSeparator: {
    extends: {
      name: "Luck UI Separator",
      href: "/docs/components/separator",
    },
    props: [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: '"vertical"',
        description: "Orientation of the separator within the group.",
      },
    ],
  },
  ButtonGroupText: {
    props: [
      {
        name: "render",
        type: "ReactElement | ((props, state) => ReactElement)",
        description: "Render the text as a custom element instead of a div.",
      },
    ],
  },
  InputGroup: {
    props: [],
  },
  InputGroupInput: {
    extends: {
      name: "Base UI Input",
      href: "https://base-ui.com/react/components/input",
    },
    props: [],
  },
  InputGroupTextarea: {
    props: [],
  },
  InputGroupAddon: {
    props: [
      {
        name: "align",
        type: '"inline-start" | "inline-end" | "block-start" | "block-end"',
        defaultValue: '"inline-start"',
        description: "Visual placement of the addon inside the input group.",
      },
    ],
  },
  InputGroupButton: {
    extends: {
      name: "Luck UI Button",
      href: "/docs/components/button",
    },
    props: [
      {
        name: "size",
        type: '"xs" | "sm" | "icon-xs" | "icon-sm"',
        defaultValue: '"xs"',
        description: "Compact button size for use inside an input group.",
      },
    ],
  },
  InputGroupText: {
    props: [],
  },
  Dialog: {
    extends: {
      name: "Base UI Dialog.Root",
      href: "https://base-ui.com/react/components/dialog#api-reference",
    },
    props: [],
  },
  DialogTrigger: {
    extends: {
      name: "Base UI Dialog.Trigger",
      href: "https://base-ui.com/react/components/dialog#api-reference",
    },
    props: [],
  },
  DialogContent: {
    extends: {
      name: "Base UI Dialog.Popup",
      href: "https://base-ui.com/react/components/dialog#api-reference",
    },
    props: [
      {
        name: "dialogPortalProps",
        type: "BaseDialog.Portal.Props",
        description: "Props forwarded to the underlying Portal component.",
      },
      {
        name: "dialogBackdropProps",
        type: "BaseDialog.Backdrop.Props",
        description: "Props forwarded to the underlying Backdrop component.",
      },
    ],
  },
  DialogHeader: {
    props: [
      {
        name: "closeButton",
        type: "boolean",
        defaultValue: "true",
        description: "Whether to show the default close button in the header.",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the header container.",
      },
    ],
  },
  DialogBody: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the body container.",
      },
    ],
  },
  DialogFooter: {
    props: [
      {
        name: "direction",
        type: '"row" | "column"',
        defaultValue: '"column"',
        description: "Layout direction for the footer actions.",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the footer container.",
      },
    ],
  },
  DialogTitle: {
    extends: {
      name: "Base UI Dialog.Title",
      href: "https://base-ui.com/react/components/dialog#api-reference",
    },
    props: [],
  },
  DialogDescription: {
    extends: {
      name: "Base UI Dialog.Description",
      href: "https://base-ui.com/react/components/dialog#api-reference",
    },
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the description element.",
      },
    ],
  },
  DialogBackdrop: {
    extends: {
      name: "Base UI Dialog.Backdrop",
      href: "https://base-ui.com/react/components/dialog#api-reference",
    },
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the backdrop element.",
      },
    ],
  },
  DialogClose: {
    extends: {
      name: "Base UI Dialog.Close",
      href: "https://base-ui.com/react/components/dialog#api-reference",
    },
    props: [],
  },
  DialogPortal: {
    extends: {
      name: "Base UI Dialog.Portal",
      href: "https://base-ui.com/react/components/dialog#api-reference",
    },
    props: [],
  },
  Drawer: {
    extends: {
      name: "Base UI Drawer.Root",
      href: "https://base-ui.com/react/components/drawer#api-reference",
    },
    props: [
      {
        name: "position",
        type: '"top" | "right" | "bottom" | "left"',
        defaultValue: '"bottom"',
        description:
          "The edge of the screen the drawer is anchored to. The swipe direction is derived from this automatically.",
      },
    ],
  },
  DrawerTrigger: {
    extends: {
      name: "Base UI Drawer.Trigger",
      href: "https://base-ui.com/react/components/drawer#api-reference",
    },
    props: [],
  },
  DrawerContent: {
    extends: {
      name: "Base UI Drawer.Popup",
      href: "https://base-ui.com/react/components/drawer#api-reference",
    },
    props: [
      {
        name: "position",
        type: '"top" | "right" | "bottom" | "left"',
        description: "Overrides the position inherited from the parent Drawer.",
      },
      {
        name: "variant",
        type: '"default" | "inset"',
        defaultValue: '"default"',
        description: "Use `inset` to float the drawer away from the screen edges.",
      },
      {
        name: "showBar",
        type: "boolean",
        defaultValue: "false",
        description: "Whether to render a drag handle bar on the swipe edge.",
      },
      {
        name: "showCloseButton",
        type: "boolean",
        defaultValue: "false",
        description: "Whether to render a close button in the top-right corner.",
      },
      {
        name: "portalProps",
        type: "BaseDrawer.Portal.Props",
        description: "Props forwarded to the underlying Portal component.",
      },
    ],
  },
  DrawerHeader: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the header container.",
      },
    ],
  },
  DrawerBody: {
    props: [
      {
        name: "scrollable",
        type: "boolean",
        defaultValue: "true",
        description: "Whether to wrap the body in a scroll area for overflowing content.",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the body container.",
      },
    ],
  },
  DrawerFooter: {
    props: [
      {
        name: "direction",
        type: '"row" | "column"',
        defaultValue: '"column"',
        description: "Layout direction for the footer actions.",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the footer container.",
      },
    ],
  },
  DrawerTitle: {
    extends: {
      name: "Base UI Drawer.Title",
      href: "https://base-ui.com/react/components/drawer#api-reference",
    },
    props: [],
  },
  DrawerDescription: {
    extends: {
      name: "Base UI Drawer.Description",
      href: "https://base-ui.com/react/components/drawer#api-reference",
    },
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the description element.",
      },
    ],
  },
  DrawerBar: {
    props: [
      {
        name: "position",
        type: '"top" | "right" | "bottom" | "left"',
        description: "Overrides the position inherited from the parent Drawer.",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the drag bar.",
      },
    ],
  },
  DrawerSwipeArea: {
    extends: {
      name: "Base UI Drawer.SwipeArea",
      href: "https://base-ui.com/react/components/drawer#api-reference",
    },
    props: [
      {
        name: "position",
        type: '"top" | "right" | "bottom" | "left"',
        description: "Overrides the position inherited from the parent Drawer.",
      },
    ],
  },
  DrawerBackdrop: {
    extends: {
      name: "Base UI Drawer.Backdrop",
      href: "https://base-ui.com/react/components/drawer#api-reference",
    },
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the backdrop element.",
      },
    ],
  },
  DrawerClose: {
    extends: {
      name: "Base UI Drawer.Close",
      href: "https://base-ui.com/react/components/drawer#api-reference",
    },
    props: [],
  },
  DrawerPortal: {
    extends: {
      name: "Base UI Drawer.Portal",
      href: "https://base-ui.com/react/components/drawer#api-reference",
    },
    props: [],
  },
  Card: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the card container.",
      },
    ],
  },
  CardHeader: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the header container.",
      },
    ],
  },
  CardTitle: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the title element.",
      },
    ],
  },
  CardDescription: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the description element.",
      },
    ],
  },
  CardAction: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the action container.",
      },
    ],
  },
  CardPanel: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the panel container.",
      },
    ],
  },
  CardFooter: {
    props: [
      {
        name: "direction",
        type: '"row" | "column"',
        defaultValue: '"row"',
        description: "Layout direction for the footer content.",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the footer container.",
      },
    ],
  },
  AlertDialog: {
    extends: {
      name: "Base UI AlertDialog.Root",
      href: "https://base-ui.com/react/components/alert-dialog#api-reference",
    },
    props: [],
  },
  AlertDialogTrigger: {
    extends: {
      name: "Base UI AlertDialog.Trigger",
      href: "https://base-ui.com/react/components/alert-dialog#api-reference",
    },
    props: [],
  },
  AlertDialogContent: {
    extends: {
      name: "Base UI AlertDialog.Popup",
      href: "https://base-ui.com/react/components/alert-dialog#api-reference",
    },
    props: [],
  },
  AlertDialogHeader: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the header container.",
      },
    ],
  },
  AlertDialogFooter: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the footer container.",
      },
    ],
  },
  AlertDialogTitle: {
    extends: {
      name: "Base UI AlertDialog.Title",
      href: "https://base-ui.com/react/components/alert-dialog#api-reference",
    },
    props: [],
  },
  AlertDialogDescription: {
    extends: {
      name: "Base UI AlertDialog.Description",
      href: "https://base-ui.com/react/components/alert-dialog#api-reference",
    },
    props: [],
  },
  AlertDialogBackdrop: {
    extends: {
      name: "Base UI AlertDialog.Backdrop",
      href: "https://base-ui.com/react/components/alert-dialog#api-reference",
    },
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the backdrop element.",
      },
    ],
  },
  AlertDialogClose: {
    extends: {
      name: "Base UI AlertDialog.Close",
      href: "https://base-ui.com/react/components/alert-dialog#api-reference",
    },
    props: [],
  },
  AlertDialogCloseButton: {
    extends: {
      name: "Base UI AlertDialog.Close",
      href: "https://base-ui.com/react/components/alert-dialog#api-reference",
    },
    props: [],
  },
  AlertDialogPortal: {
    extends: {
      name: "Base UI AlertDialog.Portal",
      href: "https://base-ui.com/react/components/alert-dialog#api-reference",
    },
    props: [],
  },
  RadioGroup: {
    extends: {
      name: "Base UI RadioGroup",
      href: "https://base-ui.com/react/components/radio#api-reference",
    },
    props: [],
  },
  Checkbox: {
    extends: {
      name: "Base UI Checkbox.Root",
      href: "https://base-ui.com/react/components/checkbox#api-reference",
    },
    props: [],
  },
  CheckboxGroup: {
    extends: {
      name: "Base UI CheckboxGroup",
      href: "https://base-ui.com/react/components/checkbox-group#api-reference",
    },
    props: [],
  },
  Radio: {
    extends: {
      name: "Base UI Radio",
      href: "https://base-ui.com/react/components/radio#api-reference",
    },
    props: [],
  },
  Tabs: {
    extends: {
      name: "Base UI Tabs.Root",
      href: "https://base-ui.com/react/components/tabs#api-reference",
    },
    props: [],
  },
  TabsList: {
    extends: {
      name: "Base UI Tabs.List",
      href: "https://base-ui.com/react/components/tabs#api-reference",
    },
    props: [
      {
        name: "variant",
        type: '"default" | "underline"',
        defaultValue: '"default"',
        description: "Visual style of the tabs list.",
      },
      {
        name: "size",
        type: '"default" | "sm" | "lg"',
        defaultValue: '"default"',
        description: "Size of the tabs and indicator.",
      },
    ],
  },
  TabsTab: {
    extends: {
      name: "Base UI Tabs.Tab",
      href: "https://base-ui.com/react/components/tabs#api-reference",
    },
    props: [
      {
        name: "size",
        type: '"default" | "sm" | "lg"',
        description: "Override the tab size. Inherits from TabsList by default.",
      },
    ],
  },
  TabsPanel: {
    extends: {
      name: "Base UI Tabs.Panel",
      href: "https://base-ui.com/react/components/tabs#api-reference",
    },
    props: [],
  },
  Popover: {
    extends: {
      name: "Base UI Popover.Root",
      href: "https://base-ui.com/react/components/popover#api-reference",
    },
    props: [],
  },
  PopoverTrigger: {
    extends: {
      name: "Base UI Popover.Trigger",
      href: "https://base-ui.com/react/components/popover#api-reference",
    },
    props: [],
  },
  PopoverContent: {
    extends: {
      name: "Base UI Popover.Popup",
      href: "https://base-ui.com/react/components/popover#api-reference",
    },
    props: [
      {
        name: "positionerProps",
        type: "BasePopover.Positioner.Props",
        description:
          "Props forwarded to the underlying Positioner component. Includes align, side, sideOffset, alignOffset, collisionPadding, etc.",
      },
    ],
  },
  PopoverHeader: {
    props: [
      {
        name: "closeButton",
        type: "boolean",
        defaultValue: "true",
        description: "Whether to show the default close button in the header.",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the header container.",
      },
    ],
  },
  PopoverBody: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the body container.",
      },
    ],
  },
  PopoverTitle: {
    extends: {
      name: "Base UI Popover.Title",
      href: "https://base-ui.com/react/components/popover#api-reference",
    },
    props: [],
  },
  PopoverClose: {
    extends: {
      name: "Base UI Popover.Close",
      href: "https://base-ui.com/react/components/popover#api-reference",
    },
    props: [],
  },
  PopoverPortal: {
    extends: {
      name: "Base UI Popover.Portal",
      href: "https://base-ui.com/react/components/popover#api-reference",
    },
    props: [],
  },
  ScrollArea: {
    extends: {
      name: "Base UI ScrollArea.Root",
      href: "https://base-ui.com/react/components/scroll-area#api-reference",
    },
    props: [
      {
        name: "viewportProps",
        type: "BaseScrollArea.Viewport.Props",
        description: "Props forwarded to the underlying Viewport component.",
      },
    ],
  },
  ScrollBar: {
    extends: {
      name: "Base UI ScrollArea.Scrollbar",
      href: "https://base-ui.com/react/components/scroll-area#api-reference",
    },
    props: [
      {
        name: "orientation",
        type: '"vertical" | "horizontal"',
        defaultValue: '"vertical"',
        description: "Orientation of the scrollbar.",
      },
    ],
  },
  Autocomplete: {
    extends: {
      name: "Base UI Autocomplete.Root",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [],
  },
  Command: {
    extends: {
      name: "Base UI Autocomplete.Root",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [
      {
        name: "trigger",
        type: "string | string[] | CommandTriggerMatcher",
        defaultValue: '["/", "、"]',
        description:
          "What opens the list while typing. A string or array of strings opens it when the value starts with one of them; a matcher function returns the matched segment or null. See createCommandTrigger.",
      },
      {
        name: "filter",
        type: "(itemValue, query, itemToStringValue?) => boolean",
        description:
          "Matches an item against the query typed after the trigger. Defaults to a locale-aware contains match.",
      },
      {
        name: "value",
        type: "string",
        description: "The input value. Use when controlled.",
      },
      {
        name: "defaultValue",
        type: "string",
        description: "The uncontrolled input value when initially rendered.",
      },
      {
        name: "onValueChange",
        type: "(value: string, eventDetails) => void",
        description: "Called when the input value changes.",
      },
      {
        name: "onSelect",
        type: "(itemValue, details: { match, query, value }) => void",
        description:
          "Called when a command is selected with the pointer or the confirm key. The trigger segment is removed from the input before this fires; details.value is the resulting input value.",
      },
      {
        name: "confirmKey",
        type: '"enter" | "tab" | "both"',
        defaultValue: '"enter"',
        description: "Which key confirms the highlighted command.",
      },
      {
        name: "autoHighlight",
        type: 'boolean | "always"',
        defaultValue: '"always"',
        description: "Whether the first matching item is highlighted automatically.",
      },
    ],
  },
  CommandInput: {
    extends: {
      name: "Base UI Autocomplete.Input",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [
      {
        name: "multiline",
        type: "boolean",
        defaultValue: "false",
        description: "Render an InputGroupTextarea instead of an InputGroupInput.",
      },
      {
        name: "render",
        type: "ReactElement",
        description:
          "Custom element to render as the input. Defaults to InputGroupInput, or InputGroupTextarea when multiline is set.",
      },
    ],
  },
  CommandTrigger: {
    extends: {
      name: "Base UI Autocomplete.Trigger",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [],
  },
  CommandContent: {
    extends: {
      name: "Base UI Autocomplete.Popup",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [
      {
        name: "positionerProps",
        type: "BaseAutocomplete.Positioner.Props",
        description:
          "Props forwarded to the underlying Positioner. Defaults to side top, align start, anchored to the closest InputGroup.",
      },
    ],
  },
  CommandList: {
    extends: {
      name: "Base UI Autocomplete.List",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [],
  },
  CommandItem: {
    extends: {
      name: "Base UI Autocomplete.Item",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [],
  },
  CommandItemLabel: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional classes for the label.",
      },
    ],
  },
  CommandItemDescription: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional classes for the muted description shown after the label.",
      },
    ],
  },
  CommandShortcut: {
    props: [
      {
        name: "className",
        type: "string",
        description:
          "Additional classes for the trailing shortcut slot. Place Kbd elements inside.",
      },
    ],
  },
  CommandEmpty: {
    extends: {
      name: "Base UI Autocomplete.Empty",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [],
  },
  CommandStatus: {
    extends: {
      name: "Base UI Autocomplete.Status",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [],
  },
  CommandSeparator: {
    extends: {
      name: "Base UI Autocomplete.Separator",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [],
  },
  CommandGroup: {
    extends: {
      name: "Base UI Autocomplete.Group",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [],
  },
  CommandGroupLabel: {
    extends: {
      name: "Base UI Autocomplete.GroupLabel",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [],
  },
  createCommandTrigger: {
    props: [
      {
        name: "trigger",
        type: "string | string[]",
        description: "The character(s) that open the list.",
      },
      {
        name: "options.position",
        type: '"start" | "anywhere"',
        defaultValue: '"start"',
        description:
          "start matches only when the whole value starts with the trigger; anywhere matches the trigger after whitespace before the caret.",
      },
    ],
  },
  AutocompleteInputGroup: {
    extends: {
      name: "Base UI Autocomplete.InputGroup",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [],
  },
  AutocompleteInput: {
    extends: {
      name: "Base UI Autocomplete.Input",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [],
  },
  AutocompleteInputAddon: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional classes for the addon container, used for leading/trailing icons.",
      },
    ],
  },
  AutocompleteTrigger: {
    extends: {
      name: "Base UI Autocomplete.Trigger",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [],
  },
  AutocompleteClear: {
    extends: {
      name: "Base UI Autocomplete.Clear",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [],
  },
  AutocompleteContent: {
    extends: {
      name: "Base UI Autocomplete.Popup",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [
      {
        name: "positionerProps",
        type: "BaseAutocomplete.Positioner.Props",
        description:
          "Props forwarded to the underlying Positioner component. Includes align, side, sideOffset, alignOffset, collisionPadding, etc.",
      },
    ],
  },
  AutocompleteList: {
    extends: {
      name: "Base UI Autocomplete.List",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [],
  },
  AutocompleteItem: {
    extends: {
      name: "Base UI Autocomplete.Item",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [],
  },
  AutocompleteValue: {
    extends: {
      name: "Base UI Autocomplete.Value",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [],
  },
  AutocompleteEmpty: {
    extends: {
      name: "Base UI Autocomplete.Empty",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [],
  },
  AutocompleteStatus: {
    extends: {
      name: "Base UI Autocomplete.Status",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [],
  },
  AutocompleteSeparator: {
    extends: {
      name: "Base UI Autocomplete.Separator",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [],
  },
  AutocompleteGroup: {
    extends: {
      name: "Base UI Autocomplete.Group",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [],
  },
  AutocompleteGroupLabel: {
    extends: {
      name: "Base UI Autocomplete.GroupLabel",
      href: "https://base-ui.com/react/components/autocomplete#api-reference",
    },
    props: [],
  },
  NumberField: {
    extends: {
      name: "Base UI NumberField.Root",
      href: "https://base-ui.com/react/components/number-field#api-reference",
    },
    props: [],
  },
  NumberFieldGroup: {
    extends: {
      name: "Base UI NumberField.Group",
      href: "https://base-ui.com/react/components/number-field#api-reference",
    },
    props: [
      {
        name: "size",
        type: '"sm" | "default" | "lg"',
        defaultValue: '"default"',
        description: "Controls the height and text size of the field.",
      },
    ],
  },
  NumberFieldInput: {
    extends: {
      name: "Base UI NumberField.Input",
      href: "https://base-ui.com/react/components/number-field#api-reference",
    },
    props: [],
  },
  NumberFieldDecrement: {
    extends: {
      name: "Base UI NumberField.Decrement",
      href: "https://base-ui.com/react/components/number-field#api-reference",
    },
    props: [],
  },
  NumberFieldIncrement: {
    extends: {
      name: "Base UI NumberField.Increment",
      href: "https://base-ui.com/react/components/number-field#api-reference",
    },
    props: [],
  },
  NumberFieldScrubArea: {
    extends: {
      name: "Base UI NumberField.ScrubArea",
      href: "https://base-ui.com/react/components/number-field#api-reference",
    },
    props: [],
  },
  NumberFieldScrubAreaCursor: {
    extends: {
      name: "Base UI NumberField.ScrubAreaCursor",
      href: "https://base-ui.com/react/components/number-field#api-reference",
    },
    props: [],
  },
  Combobox: {
    extends: {
      name: "Base UI Combobox.Root",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [],
  },
  ComboboxTrigger: {
    extends: {
      name: "Base UI Combobox.Trigger",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [],
  },
  ComboboxContent: {
    extends: {
      name: "Base UI Combobox.Popup",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [
      {
        name: "positionerProps",
        type: "BaseCombobox.Positioner.Props",
        description:
          "Props forwarded to the underlying Positioner component. Includes align, side, sideOffset, alignOffset, collisionPadding, etc.",
      },
    ],
  },
  ComboboxList: {
    extends: {
      name: "Base UI Combobox.List",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [],
  },
  ComboboxItem: {
    extends: {
      name: "Base UI Combobox.Item",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [],
  },
  ComboboxValue: {
    extends: {
      name: "Base UI Combobox.Value",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [],
  },
  ComboboxInput: {
    extends: {
      name: "Base UI Combobox.Input",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [
      {
        name: "showRemove",
        type: "boolean",
        defaultValue: "true",
        description:
          "Whether to show the clear button. Hidden automatically when children are provided.",
      },
      {
        name: "showTrigger",
        type: "boolean",
        defaultValue: "true",
        description: "Whether to show the dropdown trigger button.",
      },
    ],
  },
  ComboboxEmpty: {
    extends: {
      name: "Base UI Combobox.Empty",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [],
  },
  ComboboxSeparator: {
    extends: {
      name: "Base UI Combobox.Separator",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [],
  },
  ComboboxChips: {
    extends: {
      name: "Base UI Combobox.Chips",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [],
  },
  ComboboxChip: {
    extends: {
      name: "Base UI Combobox.Chip",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [
      {
        name: "showRemove",
        type: "boolean",
        defaultValue: "true",
        description: "Whether to show the remove button on the chip.",
      },
    ],
  },
  ComboboxItemIndicator: {
    extends: {
      name: "Base UI Combobox.ItemIndicator",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [],
  },
  ComboboxGroup: {
    extends: {
      name: "Base UI Combobox.Group",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [],
  },
  ComboboxGroupLabel: {
    extends: {
      name: "Base UI Combobox.GroupLabel",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [],
  },
  ComboboxItemAddon: {
    props: [
      {
        name: "render",
        type: "React.ReactElement | ((props, state) => React.ReactElement)",
        description:
          "Custom element or render function used instead of the default span container.",
      },
    ],
  },
  ComboboxItemLabel: {
    props: [
      {
        name: "render",
        type: "React.ReactElement | ((props, state) => React.ReactElement)",
        description:
          "Custom element or render function used instead of the default span container.",
      },
    ],
  },
  ToastProvider: {
    extends: {
      name: "Base UI Toast.Provider",
      href: "https://base-ui.com/react/components/toast#api-reference",
    },
    props: [
      {
        name: "position",
        type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"',
        defaultValue: '"bottom-right"',
        description: "Placement of the toast stack on the screen.",
      },
    ],
  },
  Tooltip: {
    extends: {
      name: "Base UI Tooltip.Root",
      href: "https://base-ui.com/react/components/tooltip#api-reference",
    },
    props: [],
  },
  TooltipTrigger: {
    extends: {
      name: "Base UI Tooltip.Trigger",
      href: "https://base-ui.com/react/components/tooltip#api-reference",
    },
    props: [
      {
        name: "delay",
        type: "number",
        defaultValue: "100",
        description: "Delay in milliseconds before the tooltip opens.",
      },
    ],
  },
  TooltipContent: {
    extends: {
      name: "Base UI Tooltip.Popup",
      href: "https://base-ui.com/react/components/tooltip#api-reference",
    },
    props: [
      {
        name: "positionerProps",
        type: "BaseTooltip.Positioner.Props",
        description:
          "Props forwarded to the underlying Positioner component. Includes align, side, sideOffset, alignOffset, collisionPadding, etc.",
      },
      {
        name: "portalProps",
        type: "BaseTooltip.Portal.Props",
        description: "Props forwarded to the underlying Portal component.",
      },
    ],
  },
  TooltipViewport: {
    extends: {
      name: "Base UI Tooltip.Viewport",
      href: "https://base-ui.com/react/components/tooltip#api-reference",
    },
    props: [],
  },
  TooltipProvider: {
    extends: {
      name: "Base UI Tooltip.Provider",
      href: "https://base-ui.com/react/components/tooltip#api-reference",
    },
    props: [],
  },
  Separator: {
    extends: {
      name: "Base UI Separator",
      href: "https://base-ui.com/react/components/separator",
    },
    props: [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: '"horizontal"',
        description: "The orientation of the separator.",
      },
    ],
  },
  Kbd: {
    extends: {
      name: "HTML kbd element",
      href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd",
    },
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the keyboard key.",
      },
    ],
  },
  KbdGroup: {
    extends: {
      name: "HTML kbd element",
      href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd",
    },
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the keyboard key group.",
      },
    ],
  },
};

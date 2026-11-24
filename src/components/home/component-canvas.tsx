import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import {
  ArrowClockwiseIcon,
  ArrowRightIcon,
  BellIcon,
  CaretDownIcon,
  CaretUpIcon,
  DotsThreeOutlineIcon,
  MagnifyingGlassIcon,
  WarningOctagonIcon,
} from "@phosphor-icons/react";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "registry/default/ui/alert-dialog";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
} from "registry/default/ui/autocomplete";
import { Button, buttonVariants } from "registry/default/ui/button";
import { ButtonGroup, ButtonGroupText } from "registry/default/ui/button-group";
import { Card, CardContent, CardHeader, CardTitle } from "registry/default/ui/card";
import { Checkbox } from "registry/default/ui/checkbox";
import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxInput,
  ComboboxEmpty,
} from "registry/default/ui/combobox";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "registry/default/ui/dialog";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "registry/default/ui/drawer";
import { Input } from "registry/default/ui/input";
import { Kbd, KbdGroup } from "registry/default/ui/kbd";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "registry/default/ui/number-field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "registry/default/ui/input-group";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuItemLabel,
  MenuSeparator,
  MenuTrigger,
} from "registry/default/ui/menu";
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "registry/default/ui/popover";
import { Radio, RadioGroup } from "registry/default/ui/radio";
import { ScrollArea } from "registry/default/ui/scroll-area";
import { Separator } from "registry/default/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "registry/default/ui/select";
import Slider from "registry/default/ui/slider";
import { Switch } from "registry/default/ui/switch";
import { Tabs, TabsList, TabsPanel, TabsTab } from "registry/default/ui/tabs";
import { Tag } from "registry/default/ui/tag";
import { Textarea } from "registry/default/ui/textarea";
import { toastManager } from "registry/default/ui/toast";
import { Toggle } from "registry/default/ui/toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "registry/default/ui/tooltip";
import { cn } from "@/lib/utils";

const TILE_WIDTH = 300;
const TILE_HEIGHT = 190;
const CELL_WIDTH = 316;
const CELL_HEIGHT = 208;
const COLUMNS = 6;
const ROWS = 4;
const CYCLE_WIDTH = CELL_WIDTH * COLUMNS;
const CYCLE_HEIGHT = CELL_HEIGHT * ROWS;
const REPEAT_STEPS = [-1, 0, 1];
const SHOW_INERTIA_PANEL = import.meta.env.DEV;
const DEFAULT_INERTIA_SETTINGS = {
  decay: 5.4,
  ease: 4.2,
  maxVelocity: 1.2,
  minVelocity: 0.055,
  sampleWindow: 70,
};

type ComponentPreview = {
  label: string;
  renderPreview: () => ReactNode;
};

type DragSample = {
  time: number;
  x: number;
  y: number;
};

type InertiaSettings = typeof DEFAULT_INERTIA_SETTINGS;

type Point = {
  x: number;
  y: number;
};

type BaseCanvasItem =
  | {
      component: ComponentPreview;
      id: string;
      type: "component";
      x: number;
      y: number;
    }
  | {
      type: "title";
      x: number;
      y: number;
    };

type RepeatedCanvasItem =
  | (BaseCanvasItem & {
      key: string;
      primary?: boolean;
    })
  | {
      key: string;
      primary: boolean;
      type: "title";
      x: number;
      y: number;
    };

const selectItems = [
  { value: "astro", label: "Astro" },
  { value: "react", label: "React" },
  { value: "base-ui", label: "Base UI" },
];

type HomeLocale = "en" | "zh";

type HomeCopy = {
  canvas: {
    ariaLabel: string;
    previewAriaLabel: (label: string) => string;
    resetAriaLabel: string;
    resetLabel: string;
  };
  hero: {
    description: string;
    docsHref: string;
    docsLabel: string;
    title: string;
  };
  inertia: {
    collapseLabel: string;
    decrementLabel: string;
    incrementLabel: string;
    controls: {
      decay: string;
      ease: string;
      maxVelocity: string;
      minVelocity: string;
      sampleWindow: string;
    };
    defaultsLabel: string;
    expandLabel: string;
    panelAriaLabel: string;
    title: string;
    valueAriaLabel: (label: string) => string;
  };
  languageSwitch: {
    ariaLabel: string;
    href: string;
    label: string;
  };
  previews: {
    alertDialog: {
      cancel: string;
      confirm: string;
      description: string;
      label: string;
      title: string;
      trigger: string;
    };
    autocomplete: {
      empty: string;
      fruits: string[];
      label: string;
      placeholder: string;
    };
    button: { label: string; text: string };
    buttonGroup: { go: string; label: string; placeholder: string };
    card: { body: string; label: string; title: string };
    checkbox: { active: string; label: string; optional: string };
    combobox: { empty: string; label: string; placeholder: string };
    dialog: {
      body: string;
      cancel: string;
      description: string;
      done: string;
      label: string;
      title: string;
      trigger: string;
    };
    drawer: {
      body: string;
      cancel: string;
      description: string;
      label: string;
      save: string;
      title: string;
      trigger: string;
    };
    input: { label: string; placeholder: string };
    inputGroup: { label: string; placeholder: string };
    kbd: { label: string };
    menu: { actions: string; label: string; profile: string; settings: string; signOut: string };
    menuContent: { label: string; profile: string; settings: string; signOut: string };
    numberField: { decrement: string; increment: string; label: string };
    popover: { body: string; label: string; title: string; trigger: string };
    radio: { label: string; one: string; two: string };
    scrollArea: {
      components: string;
      examples: string;
      label: string;
      patterns: string;
      tokens: string;
    };
    separator: { help: string; label: string; profile: string; title: string };
    select: { label: string };
    slider: { ariaLabel: string; label: string };
    switch: { label: string };
    tabs: { code: string; docs: string; label: string };
    tag: { beta: string; default: string; label: string; new: string };
    textarea: { label: string; placeholder: string };
    toast: { description: string; label: string; show: string; title: string };
    toggle: { label: string; text: string };
    tooltip: { label: string; text: string; trigger: string };
  };
};

const homeCopy: Record<HomeLocale, HomeCopy> = {
  en: {
    canvas: {
      ariaLabel: "Component canvas",
      previewAriaLabel: (label) => `${label} preview`,
      resetAriaLabel: "Reset component canvas",
      resetLabel: "Reset",
    },
    hero: {
      description:
        "Luck UI is a React component library focused on delivering a warm and delightful experience. Designed and developed by a designer and built on top of Base UI.",
      docsHref: "/docs",
      docsLabel: "Docs",
      title: "A component library that feels warm",
    },
    inertia: {
      collapseLabel: "Collapse panel",
      decrementLabel: "Decrease",
      incrementLabel: "Increase",
      controls: {
        decay: "Decay",
        ease: "Ease",
        maxVelocity: "Max velocity",
        minVelocity: "Min velocity",
        sampleWindow: "Sample window",
      },
      defaultsLabel: "Defaults",
      expandLabel: "Expand panel",
      panelAriaLabel: "Inertia tuning panel",
      title: "Inertia tuning",
      valueAriaLabel: (label) => `${label} value`,
    },
    languageSwitch: {
      ariaLabel: "Switch to Simplified Chinese",
      href: "/zh",
      label: "中文",
    },
    previews: {
      alertDialog: {
        cancel: "Cancel",
        confirm: "Continue",
        description: "Review this action before applying the change.",
        label: "Alert Dialog",
        title: "Continue?",
        trigger: "Confirm",
      },
      autocomplete: {
        empty: "No fruits found.",
        fruits: ["Apple", "Banana", "Cherry", "Grape", "Orange"],
        label: "Autocomplete",
        placeholder: "Search fruit",
      },
      button: { label: "Button", text: "Button" },
      buttonGroup: { go: "Go", label: "Button Group", placeholder: "luck-ui.com" },
      card: {
        body: "This is the content of the card.",
        label: "Card",
        title: "Card title",
      },
      checkbox: { active: "Active", label: "Checkbox", optional: "Optional" },
      combobox: { empty: "No results", label: "Combobox", placeholder: "Pick one" },
      dialog: {
        body: "This dialog is opened from the draggable homepage grid.",
        cancel: "Cancel",
        description: "Adjust this component preview.",
        done: "Done",
        label: "Dialog",
        title: "Project settings",
        trigger: "Open dialog",
      },
      drawer: {
        body: "Drawers slide in from the edge and support swipe gestures.",
        cancel: "Cancel",
        description: "Swipe down or tap outside to dismiss.",
        label: "Drawer",
        save: "Save",
        title: "Edit profile",
        trigger: "Open drawer",
      },
      input: { label: "Input", placeholder: "Type something" },
      inputGroup: { label: "Input Group", placeholder: "Search" },
      kbd: { label: "Kbd" },
      menu: {
        actions: "Actions",
        label: "Menu",
        profile: "Profile",
        settings: "Settings",
        signOut: "Sign out",
      },
      menuContent: {
        label: "Menu Content",
        profile: "Profile",
        settings: "Settings",
        signOut: "Sign out",
      },
      numberField: { decrement: "Decrease", increment: "Increase", label: "Number Field" },
      popover: {
        body: "Component previews can open from the canvas.",
        label: "Popover",
        title: "Notification",
        trigger: "Notify",
      },
      radio: { label: "Radio", one: "One", two: "Two" },
      scrollArea: {
        components: "Components",
        examples: "Examples",
        label: "Scroll Area",
        patterns: "Patterns",
        tokens: "Tokens",
      },
      separator: { help: "Help", label: "Separator", profile: "Profile", title: "Settings" },
      select: { label: "Select" },
      slider: { ariaLabel: "Progress", label: "Slider" },
      switch: { label: "Switch" },
      tabs: { code: "Code", docs: "Docs", label: "Tabs" },
      tag: { beta: "Beta", default: "Default", label: "Tag", new: "New" },
      textarea: { label: "Textarea", placeholder: "Write a note" },
      toast: {
        description: "Your profile settings have been updated.",
        label: "Toast",
        show: "Show toast",
        title: "Changes saved",
      },
      toggle: { label: "Toggle", text: "Toggle" },
      tooltip: { label: "Tooltip", text: "A helpful tip", trigger: "Hover" },
    },
  },
  zh: {
    canvas: {
      ariaLabel: "组件画布",
      previewAriaLabel: (label) => `${label}预览`,
      resetAriaLabel: "重置组件画布",
      resetLabel: "重置",
    },
    hero: {
      description:
        "Luck UI 是一套专注于营造温暖、愉悦体验的 React 组件库。由设计师设计与开发，构建于 Base UI 之上。",
      docsHref: "/zh/docs",
      docsLabel: "文档",
      title: "一个有温度的组件库",
    },
    inertia: {
      collapseLabel: "折叠面板",
      decrementLabel: "减少",
      incrementLabel: "增加",
      controls: {
        decay: "衰减",
        ease: "缓动",
        maxVelocity: "最大速度",
        minVelocity: "最小速度",
        sampleWindow: "采样窗口",
      },
      defaultsLabel: "默认值",
      expandLabel: "展开面板",
      panelAriaLabel: "惯性调节面板",
      title: "惯性调节",
      valueAriaLabel: (label) => `${label}数值`,
    },
    languageSwitch: {
      ariaLabel: "切换到英文版",
      href: "/",
      label: "English",
    },
    previews: {
      alertDialog: {
        cancel: "取消",
        confirm: "继续",
        description: "请先查看此操作，再应用更改。",
        label: "警告对话框",
        title: "继续？",
        trigger: "确认",
      },
      autocomplete: {
        empty: "未找到水果。",
        fruits: ["苹果", "香蕉", "樱桃", "葡萄", "橙子"],
        label: "自动补全",
        placeholder: "搜索水果",
      },
      button: { label: "按钮", text: "按钮" },
      buttonGroup: { go: "前往", label: "按钮组", placeholder: "luck-ui.com" },
      card: { body: "这是卡片的内容。", label: "卡片", title: "卡片标题" },
      checkbox: { active: "已启用", label: "复选框", optional: "可选" },
      combobox: { empty: "无结果", label: "组合框", placeholder: "请选择" },
      dialog: {
        body: "此对话框从可拖拽的首页网格中打开。",
        cancel: "取消",
        description: "调整此组件预览。",
        done: "完成",
        label: "对话框",
        title: "项目设置",
        trigger: "打开对话框",
      },
      drawer: {
        body: "抽屉从屏幕边缘滑入，并支持滑动手势。",
        cancel: "取消",
        description: "下滑或点击外部即可关闭。",
        label: "抽屉",
        save: "保存",
        title: "编辑资料",
        trigger: "打开抽屉",
      },
      input: { label: "输入框", placeholder: "输入内容" },
      inputGroup: { label: "输入组", placeholder: "搜索" },
      kbd: { label: "快捷键" },
      menu: {
        actions: "操作",
        label: "菜单",
        profile: "个人资料",
        settings: "设置",
        signOut: "退出登录",
      },
      menuContent: {
        label: "菜单内容",
        profile: "个人资料",
        settings: "设置",
        signOut: "退出登录",
      },
      numberField: { decrement: "减少", increment: "增加", label: "数字输入框" },
      popover: {
        body: "组件预览可以从画布中打开。",
        label: "弹出框",
        title: "通知",
        trigger: "通知",
      },
      radio: { label: "单选按钮", one: "选项一", two: "选项二" },
      scrollArea: {
        components: "组件",
        examples: "示例",
        label: "滚动区域",
        patterns: "模式",
        tokens: "令牌",
      },
      separator: { help: "帮助", label: "分隔线", profile: "个人资料", title: "设置" },
      select: { label: "选择器" },
      slider: { ariaLabel: "进度", label: "滑块" },
      switch: { label: "开关" },
      tabs: { code: "代码", docs: "文档", label: "标签页" },
      tag: { beta: "测试版", default: "默认", label: "标签", new: "新" },
      textarea: { label: "文本域", placeholder: "写一条备注" },
      toast: {
        description: "你的个人资料设置已更新。",
        label: "轻提示",
        show: "显示提示",
        title: "更改已保存",
      },
      toggle: { label: "切换按钮", text: "切换" },
      tooltip: { label: "工具提示", text: "一条有用的提示", trigger: "悬停" },
    },
  },
};

function createComponentPreviews(copy: HomeCopy): ComponentPreview[] {
  const p = copy.previews;

  return [
    {
      label: p.alertDialog.label,
      renderPreview: () => (
        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button size="sm" variant="outline">
                <WarningOctagonIcon />
                {p.alertDialog.trigger}
              </Button>
            }
          />
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{p.alertDialog.title}</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>{p.alertDialog.description}</AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogClose
                render={<Button variant="secondary">{p.alertDialog.cancel}</Button>}
              />
              <AlertDialogClose render={<Button>{p.alertDialog.confirm}</Button>} />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
    },
    {
      label: p.autocomplete.label,
      renderPreview: () => (
        <Autocomplete items={p.autocomplete.fruits}>
          <AutocompleteInputGroup className="w-44">
            <AutocompleteInput placeholder={p.autocomplete.placeholder} />
          </AutocompleteInputGroup>
          <AutocompleteContent>
            <AutocompleteEmpty>{p.autocomplete.empty}</AutocompleteEmpty>
            <AutocompleteList>
              {(item: string) => (
                <AutocompleteItem key={item} value={item}>
                  {item}
                </AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>
      ),
    },
    {
      label: p.button.label,
      renderPreview: () => <Button>{p.button.text}</Button>,
    },
    {
      label: p.buttonGroup.label,
      renderPreview: () => (
        <ButtonGroup>
          <ButtonGroupText>https://</ButtonGroupText>
          <Input className="w-24" placeholder={p.buttonGroup.placeholder} />
          <Button variant="outline">{p.buttonGroup.go}</Button>
        </ButtonGroup>
      ),
    },
    {
      label: p.card.label,
      renderPreview: () => (
        <Card className="w-52">
          <CardHeader>
            <CardTitle>{p.card.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{p.card.body}</p>
          </CardContent>
        </Card>
      ),
    },
    {
      label: p.checkbox.label,
      renderPreview: () => (
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Checkbox defaultChecked />
            <span>{p.checkbox.active}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Checkbox />
            <span>{p.checkbox.optional}</span>
          </div>
        </div>
      ),
    },
    {
      label: p.combobox.label,
      renderPreview: () => {
        const items = [
          { value: "astro", label: "Astro" },
          { value: "react", label: "React" },
          { value: "base-ui", label: "Base UI" },
        ];
        return (
          <Combobox items={items}>
            <ComboboxInput className="w-44" placeholder={p.combobox.placeholder} />
            <ComboboxContent>
              <ComboboxList>
                {(item: (typeof items)[number]) => (
                  <ComboboxItem key={item.value} value={item}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
              <ComboboxEmpty>{p.combobox.empty}</ComboboxEmpty>
            </ComboboxContent>
          </Combobox>
        );
      },
    },
    {
      label: p.dialog.label,
      renderPreview: () => (
        <Dialog>
          <DialogTrigger render={<Button variant="outline">{p.dialog.trigger}</Button>} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{p.dialog.title}</DialogTitle>
              <DialogDescription>{p.dialog.description}</DialogDescription>
            </DialogHeader>
            <DialogBody>
              <p className="text-sm text-muted-foreground">{p.dialog.body}</p>
            </DialogBody>
            <DialogFooter direction="row">
              <DialogClose render={<Button variant="secondary">{p.dialog.cancel}</Button>} />
              <DialogClose render={<Button>{p.dialog.done}</Button>} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      label: p.drawer.label,
      renderPreview: () => (
        <Drawer>
          <DrawerTrigger render={<Button variant="outline">{p.drawer.trigger}</Button>} />
          <DrawerContent showBar>
            <DrawerHeader>
              <DrawerTitle>{p.drawer.title}</DrawerTitle>
              <DrawerDescription>{p.drawer.description}</DrawerDescription>
            </DrawerHeader>
            <DrawerBody scrollable={false}>
              <p className="text-sm text-muted-foreground">{p.drawer.body}</p>
            </DrawerBody>
            <DrawerFooter direction="row">
              <DrawerClose render={<Button variant="secondary">{p.drawer.cancel}</Button>} />
              <DrawerClose render={<Button>{p.drawer.save}</Button>} />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ),
    },
    {
      label: p.input.label,
      renderPreview: () => <Input className="w-44" placeholder={p.input.placeholder} />,
    },
    {
      label: p.inputGroup.label,
      renderPreview: () => (
        <InputGroup className="w-48">
          <InputGroupInput placeholder={p.inputGroup.placeholder} />
          <InputGroupAddon align="inline-end">
            <MagnifyingGlassIcon />
          </InputGroupAddon>
        </InputGroup>
      ),
    },
    {
      label: p.kbd.label,
      renderPreview: () => (
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <span className="text-muted-foreground">+</span>
          <Kbd>K</Kbd>
        </KbdGroup>
      ),
    },
    {
      label: p.menu.label,
      renderPreview: () => (
        <Menu>
          <MenuTrigger
            render={
              <Button size="sm" variant="outline">
                {p.menu.actions}
                <DotsThreeOutlineIcon />
              </Button>
            }
          />
          <MenuContent>
            <MenuItem>
              <MenuItemLabel>{p.menu.profile}</MenuItemLabel>
            </MenuItem>
            <MenuItem>
              <MenuItemLabel>{p.menu.settings}</MenuItemLabel>
            </MenuItem>
            <MenuSeparator />
            <MenuItem>
              <MenuItemLabel>{p.menu.signOut}</MenuItemLabel>
            </MenuItem>
          </MenuContent>
        </Menu>
      ),
    },
    {
      label: p.menuContent.label,
      renderPreview: () => (
        <div className="grid min-w-44 rounded-xl bg-popover p-1.5 text-sm text-popover-foreground shadow-xs outline outline-border">
          <button
            className="rounded-lg px-3 py-2 text-left outline-none hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground"
            type="button"
          >
            {p.menuContent.profile}
          </button>
          <button
            className="rounded-lg px-3 py-2 text-left outline-none hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground"
            type="button"
          >
            {p.menuContent.settings}
          </button>
          <div className="mx-2 my-1.5 h-px bg-border" />
          <button
            className="rounded-lg px-3 py-2 text-left text-destructive outline-none hover:bg-destructive hover:text-destructive-foreground focus-visible:bg-destructive focus-visible:text-destructive-foreground"
            type="button"
          >
            {p.menuContent.signOut}
          </button>
        </div>
      ),
    },
    {
      label: p.numberField.label,
      renderPreview: () => (
        <NumberField defaultValue={3} max={10} min={0}>
          <NumberFieldGroup className="w-44">
            <NumberFieldDecrement aria-label={p.numberField.decrement} />
            <NumberFieldInput />
            <NumberFieldIncrement aria-label={p.numberField.increment} />
          </NumberFieldGroup>
        </NumberField>
      ),
    },
    {
      label: p.popover.label,
      renderPreview: () => (
        <Popover>
          <PopoverTrigger
            render={
              <Button size="sm" variant="secondary">
                <BellIcon />
                {p.popover.trigger}
              </Button>
            }
          />
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>{p.popover.title}</PopoverTitle>
            </PopoverHeader>
            <PopoverBody>
              <p className="text-sm text-muted-foreground">{p.popover.body}</p>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ),
    },
    {
      label: p.radio.label,
      renderPreview: () => (
        <RadioGroup className="gap-2" defaultValue="one">
          <div className="flex items-center gap-2 text-sm">
            <Radio value="one" />
            <span>{p.radio.one}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Radio value="two" />
            <span>{p.radio.two}</span>
          </div>
        </RadioGroup>
      ),
    },
    {
      label: p.scrollArea.label,
      renderPreview: () => (
        <ScrollArea className="h-20 w-44 rounded-md border border-border bg-background">
          <div className="space-y-2 p-3 text-xs text-muted-foreground">
            <p>{p.scrollArea.components}</p>
            <p>{p.scrollArea.tokens}</p>
            <p>{p.scrollArea.patterns}</p>
            <p>{p.scrollArea.examples}</p>
          </div>
        </ScrollArea>
      ),
    },
    {
      label: p.separator.label,
      renderPreview: () => (
        <div className="grid w-44 gap-3 text-sm">
          <p className="font-medium">{p.separator.title}</p>
          <Separator />
          <div className="flex h-5 items-center gap-3 text-muted-foreground">
            <span>{p.separator.profile}</span>
            <Separator orientation="vertical" />
            <span>{p.separator.help}</span>
          </div>
        </div>
      ),
    },
    {
      label: p.select.label,
      renderPreview: () => (
        <Select defaultValue="astro" items={selectItems}>
          <SelectTrigger className="w-44" size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {selectItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ),
    },
    {
      label: p.slider.label,
      renderPreview: () => <Slider aria-label={p.slider.ariaLabel} defaultValue={64} />,
    },
    {
      label: p.switch.label,
      renderPreview: () => <Switch defaultChecked />,
    },
    {
      label: p.tabs.label,
      renderPreview: () => (
        <Tabs className="h-20 w-44" defaultValue="docs">
          <TabsList size="sm" variant="underline">
            <TabsTab value="docs">{p.tabs.docs}</TabsTab>
            <TabsTab value="code">{p.tabs.code}</TabsTab>
          </TabsList>
          <TabsPanel value="docs">
            <div className="mt-2 h-8 rounded-md bg-muted" />
          </TabsPanel>
          <TabsPanel value="code">
            <div className="mt-2 h-8 rounded-md bg-muted" />
          </TabsPanel>
        </Tabs>
      ),
    },
    {
      label: p.tag.label,
      renderPreview: () => (
        <div className="flex flex-wrap justify-center gap-2">
          <Tag>{p.tag.default}</Tag>
          <Tag variant="secondary">{p.tag.new}</Tag>
          <Tag variant="outline">{p.tag.beta}</Tag>
        </div>
      ),
    },
    {
      label: p.textarea.label,
      renderPreview: () => (
        <Textarea block={false} className="h-16 w-44" placeholder={p.textarea.placeholder} />
      ),
    },
    {
      label: p.toast.label,
      renderPreview: () => (
        <Button
          onClick={() => {
            toastManager.add({
              description: p.toast.description,
              title: p.toast.title,
              type: "success",
            });
          }}
          size="sm"
          variant="outline"
        >
          {p.toast.show}
        </Button>
      ),
    },
    {
      label: p.toggle.label,
      renderPreview: () => <Toggle size="sm">{p.toggle.text}</Toggle>,
    },
    {
      label: p.tooltip.label,
      renderPreview: () => (
        <Tooltip>
          <TooltipTrigger
            render={
              <Button size="sm" variant="outline">
                {p.tooltip.trigger}
              </Button>
            }
          />
          <TooltipContent>
            <p className="text-sm">{p.tooltip.text}</p>
          </TooltipContent>
        </Tooltip>
      ),
    },
  ];
}

const titleArea = {
  column: -1,
  columnSpan: 2,
  row: -1,
  rowSpan: 2,
};

const gridColumns = Array.from({ length: COLUMNS }, (_, index) => index - COLUMNS / 2);
const gridRows = Array.from({ length: ROWS }, (_, index) => index - ROWS / 2);
const visibleGridCells = gridRows.flatMap((row) =>
  gridColumns
    .filter((column) => !isInsideTitleArea(column, row))
    .map((column) => ({ column, row })),
);

function isInsideTitleArea(column: number, row: number) {
  return (
    column >= titleArea.column &&
    column < titleArea.column + titleArea.columnSpan &&
    row >= titleArea.row &&
    row < titleArea.row + titleArea.rowSpan
  );
}

function getGridItemCenter(column: number, row: number, columnSpan = 1, rowSpan = 1) {
  return {
    x: (column + columnSpan / 2) * CELL_WIDTH,
    y: (row + rowSpan / 2) * CELL_HEIGHT,
  };
}

function createBaseItems(componentPreviews: ComponentPreview[]): BaseCanvasItem[] {
  return [
    ...visibleGridCells.map(({ column, row }, index): BaseCanvasItem => {
      const component = componentPreviews[index % componentPreviews.length];
      const { x, y } = getGridItemCenter(column, row);

      return {
        component,
        id: `${column}:${row}`,
        type: "component",
        x,
        y,
      };
    }),
    {
      type: "title",
      ...getGridItemCenter(
        titleArea.column,
        titleArea.row,
        titleArea.columnSpan,
        titleArea.rowSpan,
      ),
    },
  ];
}

const baseItemsByLocale: Record<HomeLocale, BaseCanvasItem[]> = {
  en: createBaseItems(createComponentPreviews(homeCopy.en)),
  zh: createBaseItems(createComponentPreviews(homeCopy.zh)),
};

function wrapOffset(value: number, size: number) {
  return ((((value + size / 2) % size) + size) % size) - size / 2;
}

function getReleaseVelocity(samples: DragSample[]) {
  const firstSample = samples[0];
  const lastSample = samples.at(-1);
  if (!firstSample || !lastSample || firstSample === lastSample) return { x: 0, y: 0 };

  const elapsed = Math.max(lastSample.time - firstSample.time, 16);
  return {
    x: (lastSample.x - firstSample.x) / elapsed,
    y: (lastSample.y - firstSample.y) / elapsed,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function easeOut(value: number, power: number) {
  return 1 - Math.pow(1 - value, power);
}

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;

  return Boolean(
    target.closest(
      [
        "a",
        "button",
        "input",
        "select",
        "textarea",
        "[role='button']",
        "[role='checkbox']",
        "[role='combobox']",
        "[role='menuitem']",
        "[role='radio']",
        "[role='slider']",
        "[role='switch']",
        "[role='tab']",
        "[data-slot='slider-control']",
      ].join(","),
    ),
  );
}

function ComponentCard({
  component,
  previewAriaLabel,
  x,
  y,
}: {
  component: ComponentPreview;
  previewAriaLabel: (label: string) => string;
  x: number;
  y: number;
}) {
  return (
    <article
      aria-label={previewAriaLabel(component.label)}
      className="absolute top-1/2 left-1/2 flex items-center justify-center overflow-hidden rounded-2xl bg-card p-4"
      style={{
        contain: "layout paint style",
        containIntrinsicSize: `${TILE_WIDTH}px ${TILE_HEIGHT}px`,
        contentVisibility: "auto",
        height: TILE_HEIGHT,
        transform: `translate3d(${x - TILE_WIDTH / 2}px, ${y - TILE_HEIGHT / 2}px, 0)`,
        width: TILE_WIDTH,
      }}
    >
      <div className="scale-95">{component.renderPreview()}</div>
    </article>
  );
}

function TitleCard({
  copy,
  primary,
  x,
  y,
}: {
  copy: HomeCopy["hero"];
  primary: boolean;
  x: number;
  y: number;
}) {
  return (
    <article
      className="pointer-events-none absolute top-1/2 left-1/2 flex flex-col items-center justify-center gap-5 text-center"
      style={{
        contain: "layout paint style",
        containIntrinsicSize: `${CELL_WIDTH * 2}px ${CELL_HEIGHT * 2}px`,
        contentVisibility: "auto",
        height: CELL_HEIGHT * 2,
        transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0)`,
        width: `min(${CELL_WIDTH * 2}px, calc(100vw - 2rem))`,
      }}
    >
      <div className="grid gap-4">
        {primary ? (
          <h1 className="text-3xl leading-none font-semibold text-balance sm:text-4xl md:text-5xl">
            {copy.title}
          </h1>
        ) : (
          <p className="text-3xl leading-none font-semibold text-balance sm:text-4xl md:text-5xl">
            {copy.title}
          </p>
        )}
        <p className="mx-auto max-w-lg text-base leading-7 text-muted-foreground">
          {copy.description}
        </p>
      </div>
      <Link
        className={cn(buttonVariants({ size: "lg" }), "pointer-events-auto shadow-xs")}
        to={copy.docsHref}
        onPointerDown={(event) => event.stopPropagation()}
      >
        {copy.docsLabel}
        <ArrowRightIcon />
      </Link>
    </article>
  );
}

function InertiaControl({
  decrementLabel,
  incrementLabel,
  label,
  max,
  min,
  onChange,
  step,
  value,
  valueAriaLabel,
}: {
  decrementLabel: string;
  incrementLabel: string;
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
  valueAriaLabel: (label: string) => string;
}) {
  return (
    <div className="grid gap-3 text-xs font-medium text-muted-foreground">
      <span className="flex items-center justify-between gap-3">
        <span>{label}</span>
        <NumberField
          max={max}
          min={min}
          onValueChange={(nextValue) => {
            if (nextValue !== null) onChange(nextValue);
          }}
          step={step}
          value={value}
        >
          <NumberFieldGroup className="w-32 shrink-0" size="sm">
            <NumberFieldDecrement aria-label={decrementLabel} />
            <NumberFieldInput
              aria-label={valueAriaLabel(label)}
              className="font-mono text-[11px]"
            />
            <NumberFieldIncrement aria-label={incrementLabel} />
          </NumberFieldGroup>
        </NumberField>
      </span>
      <Slider
        aria-label={label}
        className="w-full"
        max={max}
        min={min}
        onValueChange={(values) => onChange(Array.isArray(values) ? values[0] : values)}
        step={step}
        value={value}
      />
    </div>
  );
}

export function ComponentCanvas({ locale = "en" }: { locale?: HomeLocale }) {
  const copy = homeCopy[locale];
  const baseItems = baseItemsByLocale[locale];
  const [hasMoved, setHasMoved] = useState(false);
  const [inertiaSettings, setInertiaSettings] = useState(DEFAULT_INERTIA_SETTINGS);
  const [isDragging, setIsDragging] = useState(false);
  const [isInertiaPanelExpanded, setIsInertiaPanelExpanded] = useState(true);
  const dragRef = useRef<{
    originX: number;
    originY: number;
    pointerId: number;
    samples: DragSample[];
    startX: number;
    startY: number;
  } | null>(null);
  const frameRef = useRef<number | null>(null);
  const hasMovedRef = useRef(false);
  const inertiaRef = useRef<{
    duration: number;
    ease: number;
    frame: number | null;
    startOffset: Point;
    startTime: number;
    targetOffset: Point;
  } | null>(null);
  const inertiaSettingsRef = useRef(inertiaSettings);
  const layerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  const repeatedItems = useMemo(
    () =>
      REPEAT_STEPS.flatMap((repeatY) =>
        REPEAT_STEPS.flatMap((repeatX) =>
          baseItems.map((item): RepeatedCanvasItem => {
            const x = item.x + repeatX * CYCLE_WIDTH;
            const y = item.y + repeatY * CYCLE_HEIGHT;

            if (item.type === "title") {
              return {
                key: `title-${repeatX}-${repeatY}`,
                primary: repeatX === 0 && repeatY === 0,
                type: "title",
                x,
                y,
              };
            }

            return {
              component: item.component,
              id: item.id,
              key: `${item.id}-${repeatX}-${repeatY}`,
              type: "component",
              x,
              y,
            };
          }),
        ),
      ),
    [baseItems],
  );

  const renderedItems = useMemo(
    () =>
      repeatedItems.map((item) =>
        item.type === "title" ? (
          <TitleCard
            copy={copy.hero}
            key={item.key}
            primary={Boolean(item.primary)}
            x={item.x}
            y={item.y}
          />
        ) : (
          <ComponentCard
            component={item.component}
            key={item.key}
            previewAriaLabel={copy.canvas.previewAriaLabel}
            x={item.x}
            y={item.y}
          />
        ),
      ),
    [copy, repeatedItems],
  );

  const updateLayerTransform = (nextOffset: { x: number; y: number }) => {
    offsetRef.current = nextOffset;

    if (frameRef.current !== null) return;

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;

      const wrappedOffset = {
        x: wrapOffset(offsetRef.current.x, CYCLE_WIDTH),
        y: wrapOffset(offsetRef.current.y, CYCLE_HEIGHT),
      };

      if (layerRef.current) {
        layerRef.current.style.transform = `translate3d(${wrappedOffset.x}px, ${wrappedOffset.y}px, 0)`;
      }
    });
  };

  const updateHasMoved = (nextOffset: { x: number; y: number }) => {
    const nextHasMoved = Math.abs(nextOffset.x) > 1 || Math.abs(nextOffset.y) > 1;
    if (nextHasMoved === hasMovedRef.current) return;

    hasMovedRef.current = nextHasMoved;
    setHasMoved(nextHasMoved);
  };

  const updateInertiaSetting = (key: keyof InertiaSettings, value: number) => {
    setInertiaSettings((currentSettings) => {
      const nextSettings = {
        ...currentSettings,
        [key]: value,
      };
      inertiaSettingsRef.current = nextSettings;
      return nextSettings;
    });
  };

  const resetInertiaSettings = () => {
    inertiaSettingsRef.current = DEFAULT_INERTIA_SETTINGS;
    setInertiaSettings(DEFAULT_INERTIA_SETTINGS);
  };

  const cancelInertia = () => {
    const inertia = inertiaRef.current;
    if (inertia && inertia.frame !== null) window.cancelAnimationFrame(inertia.frame);
    inertiaRef.current = null;
  };

  const pushDragSample = (drag: NonNullable<typeof dragRef.current>, sample: DragSample) => {
    const sampleWindow = inertiaSettingsRef.current.sampleWindow;
    drag.samples.push(sample);
    while (drag.samples.length > 2 && sample.time - drag.samples[0].time > sampleWindow) {
      drag.samples.shift();
    }
  };

  const startInertia = (velocityX: number, velocityY: number) => {
    const settings = inertiaSettingsRef.current;
    const speed = Math.hypot(velocityX, velocityY);
    if (speed < settings.minVelocity) return;

    const velocityScale = Math.min(1, settings.maxVelocity / speed);
    const cappedVelocity = {
      x: velocityX * velocityScale,
      y: velocityY * velocityScale,
    };
    const cappedSpeed = speed * velocityScale;
    const duration = clamp(
      (Math.log(cappedSpeed / settings.minVelocity) / settings.decay) * 1000,
      180,
      1400,
    );
    const distanceScale =
      ((1 - Math.exp(-settings.decay * (duration / 1000))) * 1000) / settings.decay;
    const startOffset = offsetRef.current;
    inertiaRef.current = {
      duration,
      ease: settings.ease,
      frame: null,
      startOffset,
      startTime: performance.now(),
      targetOffset: {
        x: startOffset.x + cappedVelocity.x * distanceScale,
        y: startOffset.y + cappedVelocity.y * distanceScale,
      },
    };

    const animate = (time: number) => {
      const inertia = inertiaRef.current;
      if (!inertia) return;

      inertia.frame = null;
      const progress = clamp((time - inertia.startTime) / inertia.duration, 0, 1);
      const easedProgress = easeOut(progress, inertia.ease);

      const nextOffset = {
        x: inertia.startOffset.x + (inertia.targetOffset.x - inertia.startOffset.x) * easedProgress,
        y: inertia.startOffset.y + (inertia.targetOffset.y - inertia.startOffset.y) * easedProgress,
      };
      updateLayerTransform(nextOffset);
      updateHasMoved(nextOffset);

      if (progress >= 1) {
        inertiaRef.current = null;
        return;
      }

      inertia.frame = window.requestAnimationFrame(animate);
    };

    inertiaRef.current.frame = window.requestAnimationFrame(animate);
  };

  const finishDragging = (
    pointerId: number,
    shouldStartInertia: boolean,
    releaseSample?: DragSample,
  ) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== pointerId) return false;

    if (releaseSample) pushDragSample(drag, releaseSample);
    const releaseVelocity = getReleaseVelocity(drag.samples);
    dragRef.current = null;
    setIsDragging(false);

    if (shouldStartInertia) {
      startInertia(releaseVelocity.x, releaseVelocity.y);
    }

    return true;
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    // Ignore presses that bubble through React portals (e.g. dialog backdrops)
    // so they don't start a canvas drag or capture the pointer.
    if (!event.currentTarget.contains(event.target as Node)) return;
    if (isInteractiveTarget(event.target)) return;

    cancelInertia();

    if (dragRef.current) {
      dragRef.current = null;
      setIsDragging(false);
    }

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Ignore errors from setPointerCapture.
    }

    const startTime = event.timeStamp || performance.now();
    dragRef.current = {
      originX: offsetRef.current.x,
      originY: offsetRef.current.y,
      pointerId: event.pointerId,
      samples: [{ time: startTime, x: event.clientX, y: event.clientY }],
      startX: event.clientX,
      startY: event.clientY,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    event.preventDefault();
    const nextOffset = {
      x: drag.originX + event.clientX - drag.startX,
      y: drag.originY + event.clientY - drag.startY,
    };

    updateLayerTransform(nextOffset);
    updateHasMoved(nextOffset);

    const now = event.timeStamp || performance.now();
    pushDragSample(drag, { time: now, x: event.clientX, y: event.clientY });
  };

  const stopDragging = (
    event: ReactPointerEvent<HTMLDivElement>,
    shouldStartInertia = event.type === "pointerup",
  ) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return;

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Ignore errors from releasePointerCapture.
    }

    finishDragging(event.pointerId, shouldStartInertia, {
      time: event.timeStamp || performance.now(),
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    stopDragging(event);
  };

  const handleLostPointerCapture = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    finishDragging(event.pointerId, false);
  };

  useEffect(() => {
    const handleWindowPointerUp = (event: globalThis.PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      finishDragging(event.pointerId, event.type === "pointerup", {
        time: event.timeStamp || performance.now(),
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("pointerup", handleWindowPointerUp, true);
    window.addEventListener("pointercancel", handleWindowPointerUp, true);
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      cancelInertia();
      window.removeEventListener("pointerup", handleWindowPointerUp, true);
      window.removeEventListener("pointercancel", handleWindowPointerUp, true);
    };
  }, []);

  const resetCanvas = () => {
    cancelInertia();
    const nextOffset = { x: 0, y: 0 };
    updateLayerTransform(nextOffset);
    updateHasMoved(nextOffset);
  };

  return (
    <main className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      <div
        aria-label={copy.canvas.ariaLabel}
        className={cn(
          "absolute inset-0 z-0 touch-none overflow-hidden select-none",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
        onLostPointerCapture={handleLostPointerCapture}
        onPointerCancel={stopDragging}
        onPointerDown={handlePointerDown}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
      >
        <div
          className="absolute inset-0 will-change-transform"
          ref={layerRef}
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          {renderedItems}
        </div>
      </div>

      <div className="fixed top-4 right-4 z-30">
        <Button
          nativeButton={false}
          render={<Link aria-label={copy.languageSwitch.ariaLabel} to={copy.languageSwitch.href} />}
          size="sm"
          variant="outline"
        >
          {copy.languageSwitch.label}
        </Button>
      </div>

      {hasMoved && (
        <div className="fixed right-4 bottom-4 z-30">
          <Button aria-label={copy.canvas.resetAriaLabel} onClick={resetCanvas} size="sm">
            <ArrowClockwiseIcon />
            {copy.canvas.resetLabel}
          </Button>
        </div>
      )}

      {SHOW_INERTIA_PANEL && (
        <section
          aria-label={copy.inertia.panelAriaLabel}
          className="fixed bottom-4 left-4 z-30 grid w-[min(calc(100vw-2rem),22rem)] gap-3 rounded-lg border border-border bg-background/95 p-3 text-foreground shadow-sm backdrop-blur"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold">{copy.inertia.title}</h2>
            <div className="flex items-center gap-1">
              {isInertiaPanelExpanded ? (
                <Button onClick={resetInertiaSettings} size="sm" variant="secondary">
                  {copy.inertia.defaultsLabel}
                </Button>
              ) : null}
              <Button
                aria-expanded={isInertiaPanelExpanded}
                aria-label={
                  isInertiaPanelExpanded ? copy.inertia.collapseLabel : copy.inertia.expandLabel
                }
                onClick={() => setIsInertiaPanelExpanded((expanded) => !expanded)}
                size="icon-sm"
                variant="ghost"
              >
                {isInertiaPanelExpanded ? <CaretDownIcon /> : <CaretUpIcon />}
              </Button>
            </div>
          </div>
          {isInertiaPanelExpanded ? (
            <div className="grid gap-3">
              <InertiaControl
                label={copy.inertia.controls.sampleWindow}
                max={220}
                min={40}
                onChange={(value) => updateInertiaSetting("sampleWindow", value)}
                step={5}
                value={inertiaSettings.sampleWindow}
                decrementLabel={copy.inertia.decrementLabel}
                incrementLabel={copy.inertia.incrementLabel}
                valueAriaLabel={copy.inertia.valueAriaLabel}
              />
              <InertiaControl
                label={copy.inertia.controls.maxVelocity}
                max={2.4}
                min={0.2}
                onChange={(value) => updateInertiaSetting("maxVelocity", value)}
                step={0.025}
                value={inertiaSettings.maxVelocity}
                decrementLabel={copy.inertia.decrementLabel}
                incrementLabel={copy.inertia.incrementLabel}
                valueAriaLabel={copy.inertia.valueAriaLabel}
              />
              <InertiaControl
                label={copy.inertia.controls.minVelocity}
                max={0.18}
                min={0.005}
                onChange={(value) => updateInertiaSetting("minVelocity", value)}
                step={0.005}
                value={inertiaSettings.minVelocity}
                decrementLabel={copy.inertia.decrementLabel}
                incrementLabel={copy.inertia.incrementLabel}
                valueAriaLabel={copy.inertia.valueAriaLabel}
              />
              <InertiaControl
                label={copy.inertia.controls.decay}
                max={12}
                min={1.5}
                onChange={(value) => updateInertiaSetting("decay", value)}
                step={0.1}
                value={inertiaSettings.decay}
                decrementLabel={copy.inertia.decrementLabel}
                incrementLabel={copy.inertia.incrementLabel}
                valueAriaLabel={copy.inertia.valueAriaLabel}
              />
              <InertiaControl
                label={copy.inertia.controls.ease}
                max={6}
                min={1}
                onChange={(value) => updateInertiaSetting("ease", value)}
                step={0.1}
                value={inertiaSettings.ease}
                decrementLabel={copy.inertia.decrementLabel}
                incrementLabel={copy.inertia.incrementLabel}
                valueAriaLabel={copy.inertia.valueAriaLabel}
              />
            </div>
          ) : null}
        </section>
      )}
    </main>
  );
}

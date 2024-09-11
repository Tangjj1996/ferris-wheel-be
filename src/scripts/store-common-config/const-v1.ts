/**
 * 增加配置
 * 1. 今天做什么运动
 * 2. 今天穿什么衣服
 */
/**
 * 初始化配置
 */
import { HotDashboardConfig } from '@/common/entities/HotDashboardConfig';
import { HotDashboardConfigItems } from '@/common/entities/HotDashboardConfigItems';
import { DashboardOption, DashboardType, PrizesBg } from '@/user/enum';

export const hotDashboardConfig: Partial<HotDashboardConfig>[] = [
  {
    dashboard_title: '今天做什么运动',
    dashboard_type: DashboardType.wheel,
    dashboard_option: DashboardOption.eat,
  },
  {
    dashboard_title: '中午吃什么🍽️',
    dashboard_type: DashboardType.wheel,
    dashboard_option: DashboardOption.eat,
  },
  {
    dashboard_title: '下午茶吃什么',
    dashboard_type: DashboardType.wheel,
    dashboard_option: DashboardOption.eat,
  },
  {
    dashboard_title: '晚餐吃什么',
    dashboard_type: DashboardType.wheel,
    dashboard_option: DashboardOption.eat,
  },
  {
    dashboard_title: '夜宵吃什么',
    dashboard_type: DashboardType.wheel,
    dashboard_option: DashboardOption.eat,
  },
  {
    dashboard_title: '今天谁买单💵',
    dashboard_type: DashboardType.wheel,
    dashboard_option: DashboardOption.money,
  },
];

export const hotDashboardConfigItems: Partial<HotDashboardConfigItems>[][] = [
  [
    {
      text: '豆浆油条',
      background: PrizesBg.odd,
    },
    {
      text: '皮蛋瘦肉粥',
      background: PrizesBg.even,
    },
    {
      text: '包子',
      background: PrizesBg.odd,
    },
    {
      text: '小笼包',
      background: PrizesBg.even,
    },
    {
      text: '煎饼果子',
      background: PrizesBg.odd,
    },
    {
      text: '糯米鸡',
      background: PrizesBg.even,
    },
  ],
  [
    {
      text: '番茄炒蛋🍅',
      background: PrizesBg.odd,
    },
    {
      text: '青椒炒肉丝🫑',
      background: PrizesBg.even,
    },
    {
      text: '蒜蓉菠菜🥬',
      background: PrizesBg.odd,
    },
    {
      text: '红烧豆腐',
      background: PrizesBg.even,
    },
    {
      text: '清炒虾仁🍤',
      background: PrizesBg.odd,
    },
    {
      text: '土豆丝🥔',
      background: PrizesBg.even,
    },
  ],
  [
    {
      text: '广式点心',
      background: PrizesBg.odd,
    },
    {
      text: '茶果',
      background: PrizesBg.even,
    },
    {
      text: '绿豆糕',
      background: PrizesBg.odd,
    },
    {
      text: '春卷',
      background: PrizesBg.even,
    },
    {
      text: '糖不甩',
      background: PrizesBg.odd,
    },
    {
      text: '蛋挞',
      background: PrizesBg.even,
    },
  ],
  [
    {
      text: '红烧肉',
      background: PrizesBg.odd,
    },
    {
      text: '宫保鸡丁',
      background: PrizesBg.even,
    },
    {
      text: '清蒸鲈鱼',
      background: PrizesBg.odd,
    },
    {
      text: '西红柿炒蛋',
      background: PrizesBg.even,
    },
    {
      text: '麻婆豆腐',
      background: PrizesBg.odd,
    },
    {
      text: '酸辣汤',
      background: PrizesBg.even,
    },
  ],
  [
    {
      text: '炒粉',
      background: PrizesBg.odd,
    },
    {
      text: '煎饺',
      background: PrizesBg.even,
    },
    {
      text: '皮蛋瘦肉粥',
      background: PrizesBg.odd,
    },
    {
      text: '烧烤',
      background: PrizesBg.even,
    },
    {
      text: '卤味拼盘',
      background: PrizesBg.odd,
    },
    {
      text: '豆腐脑',
      background: PrizesBg.even,
    },
  ],
  [
    {
      text: '雷电将军🧑‍🌾',
      background: PrizesBg.odd,
    },
    {
      text: '万叶👷',
      background: PrizesBg.even,
    },
    {
      text: '胡桃🧑‍⚕️',
      background: PrizesBg.odd,
    },
    {
      text: '钟离🧑‍🏫',
      background: PrizesBg.even,
    },
    {
      text: '甘雨👮',
      background: PrizesBg.odd,
    },
    {
      text: '纳西妲👴',
      background: PrizesBg.even,
    },
  ],
];

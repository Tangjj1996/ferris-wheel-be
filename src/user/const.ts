import { UserDashboardConfig } from './entities/UserDashboardConfig.entity';
import { UserDashboardConfigItems } from './entities/UserDashboardConfigItems.entity';
import { DashboardType, PrizesBg } from './enum';

export const userDashboardConfig: Partial<UserDashboardConfig>[] = [
  {
    dashboard_title: '中午吃啥🍽️',
    dashboard_type: DashboardType.wheel,
  },
  {
    dashboard_title: '今天谁买单💵',
    dashboard_type: DashboardType.wheel,
  },
];

export const userDashboardConfigItems: Partial<UserDashboardConfigItems>[][] = [
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

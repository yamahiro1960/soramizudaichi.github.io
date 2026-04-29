begin;

delete from public.farm_updates;

insert into public.farm_updates (
  sort_order,
  date_label,
  title,
  description,
  photo1_src,
  photo1_alt,
  photo1_caption,
  photo2_src,
  photo2_alt,
  photo2_caption,
  published
)
values
  (
    1,
    '2025-08-19',
    '花が立派に咲きました',
    '生育が安定し、花付きと莢の成長が同時に進んでいます。次週は収穫に向けた区画管理を強化します。',
    'assets/images/farm/hana.png',
    '花の勢いがある株',
    '花の勢いがあります',
    'assets/images/farm/aosaya.png',
    '大きくなった莢',
    'すでに莢が大きくなったものもあります',
    true
  ),
  (
    2,
    '2025-08-14',
    '夕暮れの圃場で葉の張りを確認',
    '夕方の温度帯で葉面の状態を観察。日中の暑さの影響を受けつつも、全体として活力のある葉姿を維持しています。',
    'assets/images/farm/yuuhi1.png',
    '圃場から見える夕日',
    '圃場からの夕日が鮮やかです',
    'assets/images/farm/yuuhi2.png',
    '夕日に照らされた圃場',
    '夕日の中で葉の状態を確認',
    true
  );

commit;

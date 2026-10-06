# AICHI CLEAN — 画像生成プロンプト集 v2（redesign/v2 追加分）

リデザイン v2 で追加した 9 枚の生成記録です。既存 24 枚（`image-prompts.md`）と同じ
**Style Anchor** を全プロンプトの冒頭に置き、同じ光・同じレンズ・同じ制服で統一しています。
より高品質なツールで再生成する場合は、下記プロンプト全文をそのまま貼り付けてください。

- 生成ツール：`openai-image-generator`（gpt-image-2 / quality=medium）
- 元 PNG：`images/_source/<slug>-v2-original.png`（git 管理外）
- 配信用：`images/v2-<slug>.webp`（長辺 1600px 以下、WebP quality 82、全て 300KB 以下）
- 画像内にロゴ・文字を入れない。人物は日本人。制服は紺ポロ＋白エプロン＋水色ゴム手袋（ロゴなし）。

---

## 0. Style Anchor（全プロンプト共通・冒頭に前置）

```
Photorealistic interior photography of an ordinary modern Japanese home. Bright, clean and airy atmosphere. Color palette of white, light blue and pale natural wood. Soft natural daylight coming from a window, gentle shadows, neutral white balance, slightly high-key exposure. Realistic residential scale of a normal Japanese family house or apartment, not a luxury mansion, not a showroom, not a hotel. Typical Japanese housing fixtures. Shot on a DSLR, 35mm lens, f/4, sharp focus, fine detail, natural color grading, no HDR effect, no heavy vignette, no illustration or CGI look. No text, no letters, no logos, no watermarks, no brand names anywhere in the image.
```

スタッフが写る場合は、さらに以下を付記：

```
The cleaning staff are Japanese, wearing a plain navy polo shirt and a plain white apron with absolutely no logo, no print and no embroidery, and plain light blue rubber gloves.
```

---

## 1. v2-hero-wide — ヒーロー背景（フルブリード）
- 用途／配置：`.hero__media`（Ken Burns 背景）。左側に文字を乗せるため、左に余白が多い構図
- サイズ：1536x1024（横）
- 生成済み：**YES**
- プロンプト（Style Anchor ＋）：
```
Wide shot of a bright ordinary Japanese living room with a low wooden table, light sofa and a large window. One female cleaning staff member in the middle distance is wiping the window-side floor with a microfiber cloth, slightly smiling, natural posture. Lots of empty bright space on the left side of the frame for text overlay. The cleaning staff are Japanese, wearing a plain navy polo shirt and a plain white apron with absolutely no logo, no print and no embroidery, and plain light blue rubber gloves.
```

## 2. v2-team-van — スタッフ3名と作業車
- 用途／配置：WHY CHOOSE US 下部の大きな角丸写真（`.photo-mask--wide`）
- サイズ：1536x1024（横）
- 生成済み：**YES**
- プロンプト（Style Anchor ＋）：
```
Three Japanese house cleaning staff, two women and one man in their 30s, standing side by side and smiling at the camera in front of a plain white compact van parked on a quiet residential street in Japan on a sunny morning. The van has no lettering, no logo and no decals. The cleaning staff are Japanese, wearing a plain navy polo shirt and a plain white apron with absolutely no logo, no print and no embroidery, and plain light blue rubber gloves. Friendly, trustworthy, relaxed expressions, full body shot, soft morning light.
```

## 3. v2-detail-faucet — 水栓のクローズアップ
- 用途／配置：マーキー、SOLUTION の小窓写真、SERVICE「洗面所クリーニング」カード
- サイズ：1536x1024（横）
- 生成済み：**YES**
- プロンプト（Style Anchor ＋）：
```
Extreme close-up of a polished chrome kitchen faucet in an ordinary Japanese home, sparkling clean with tiny water droplets, a small bright specular highlight on the chrome, white tile and light wood blurred in the background. Shallow depth of field, macro feel, very clean and fresh.
```

## 4. v2-detail-tiles — 浴室タイルと水滴
- 用途／配置：マーキー、SERVICE「トイレクリーニング」カード（イメージ）
- サイズ：1536x1024（横）
- 生成済み：**YES**
- プロンプト（Style Anchor ＋）：
```
Close-up of clean white bathroom wall tiles in a Japanese unit bath with fresh water droplets running down, grout lines perfectly white, soft daylight reflecting on the wet surface. Minimal, fresh, high-key, no fixtures visible other than tiles and a hint of a chrome shower hose blurred in the corner.
```

## 5. v2-detail-towels — タオルとエコ洗剤ボトル
- 用途／配置：マーキー
- サイズ：1536x1024（横）
- 生成済み：**YES**
- プロンプト（Style Anchor ＋）：
```
Neatly folded stack of white and light blue cotton towels next to two plain unlabeled spray bottles of eco-friendly cleaning solution (clear and pale blue liquid, no labels, no text) on a pale wooden countertop in a bright Japanese home, soft window light from the left. Minimal, tidy, fresh.
```

## 6. v2-staff-window — 窓を拭くスタッフ（逆光フレア）
- 用途／配置：SOLUTION のメイン写真（blob マスク）、マーキー
- サイズ：1536x1024（横）
- 生成済み：**YES**
- プロンプト（Style Anchor ＋）：
```
A Japanese female cleaning staff member wiping a large living room window from the inside with a squeegee, seen from inside the room, warm sunlight coming through the glass creating a soft lens flare and bright highlights, sheer white curtain pulled aside. Ordinary Japanese living room. The cleaning staff are Japanese, wearing a plain navy polo shirt and a plain white apron with absolutely no logo, no print and no embroidery, and plain light blue rubber gloves. Natural candid pose, gentle smile.
```

## 7. v2-family-room — きれいな部屋でくつろぐ家族
- 用途／配置：SERVICE「お家まるごとクリーニング」カード、FINAL CTA 背景
- サイズ：1536x1024（横）
- 生成済み：**YES**
- プロンプト（Style Anchor ＋）：
```
A happy Japanese family, a mother, father and one small child, sitting relaxed on the floor of a freshly cleaned bright living room with a low wooden table and a large window, laughing together, casual home clothes, warm but neutral light, ordinary Japanese apartment. Candid lifestyle photo, no cleaning staff in the picture.
```

## 8. v2-texture-ripple — 水の波紋光（抽象テクスチャ）
- 用途／配置：PRICE セクション背景（opacity 0.6）
- サイズ：1536x1024（横）
- 生成済み：**YES**
- プロンプト（Style Anchor は使わず単独）：
```
Abstract background texture photograph: soft water ripple light caustics gently projected on a pure white wall, pale sky blue and white tones only, very subtle, high-key, dreamy, slightly out of focus, no objects, no horizon, no text, no logos, seamless-looking, suitable as a quiet website section background. Photorealistic, natural light, no CGI look.
```

## 9. v2-staff-kitchen-portrait — シンクを磨くスタッフ（縦）
- 用途／配置：AREA セクション右の縦長マスク写真
- サイズ：1024x1536（縦）
- 生成済み：**YES**
- プロンプト（Style Anchor ＋）：
```
Vertical portrait shot of a Japanese male cleaning staff member in his 30s carefully polishing a stainless steel kitchen sink in an ordinary Japanese system kitchen, light wood cabinets, white tiles, soft window light, focused but friendly expression. The cleaning staff are Japanese, wearing a plain navy polo shirt and a plain white apron with absolutely no logo, no print and no embroidery, and plain light blue rubber gloves.
```

---

## 変換手順（再生成時）

```python
from PIL import Image
im = Image.open('images/_source/<slug>-v2-original.png').convert('RGB')
w, h = im.size; m = max(w, h)
if m > 1600:
    s = 1600 / m; im = im.resize((round(w*s), round(h*s)), Image.LANCZOS)
im.save('images/v2-<slug>.webp', 'WEBP', quality=82)
```

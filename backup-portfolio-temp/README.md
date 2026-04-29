# Portfolio Project — Development Log

> A complete chronological record of all features built, changed, and removed in this Next.js portfolio project.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion
- **3D Rendering:** Three.js, React Three Fiber, Drei
- **Language:** TypeScript
- **React:** 19

---

## Feature 1 — 3D Interactive Guitar Section

### What was asked
Build a complete interactive 3D guitar section using React Three Fiber. The guitar should:
- Be a real 3D object rendered in a Canvas
- Have 6 individually interactive strings
- Play corresponding musical notes when hovered/clicked
- Look realistic with wood materials and proper lighting
- Use Web Audio API for sound generation (no external audio files)
- Include vibration animation on strings when triggered
- Have a fallback if 3D model loading fails

### What was done

#### Initial build (Iteration 1)
- Created `src/components/guitar/Guitar3D.tsx` — full R3F scene with Canvas, camera, lighting
- Created `src/hooks/useGuitarAudio.ts` — Web Audio API hook generating realistic pluck tones (triangle fundamental + harmonics + noise burst)
- Procedural guitar model using LatheGeometry (dreadnought profile) — no GLTF needed since no public GLB URLs were available
- 6 interactive strings as cylinder meshes with raycasting for hover/click
- String vibration animation via sine-wave displacement
- Wood grain textures generated via procedural canvas textures with Bézier curves

#### Visual upgrades (Iteration 2)
- Improved string thickness, visibility, and length
- Removed `wireframe` debug mode
- Added realistic wood materials with separate spruce top (glossy) and mahogany back (matte)
- Studio 3-point lighting setup (warm key, cool rim, soft fill)
- Contact shadow beneath guitar
- Removed unused `useMemo` import

#### String alignment fixes (Iteration 3-5)
- Fixed string positions: all strings were overlapping on one line → separated with proper X offsets `[-0.055, -0.033, -0.011, 0.011, 0.033, 0.055]`
- Fixed string rotation: `Math.PI/2` rotation made strings horizontal → removed rotation so cylinders run vertically
- Fixed string Y center to `0.375` → later adjusted to `0.40` with length `3.80` (headstock y=2.3 to bridge y=-1.50)
- Fixed pickguard position to `[0.28, -0.65, 0.018]` with scale `0.7`
- Reduced contact shadow opacity from `0.25` to `0.15`, radius from `1.2` to `0.8`
- Removed binding ring (decorative body outline) — it looked like unwanted shapes around guitar

#### Audio fix (separate)
- Added `document.addEventListener("click", resumeOnInteraction, { once: true })` in `useGuitarAudio` to ensure AudioContext resumes on first user interaction (browser policy)
- Added defensive `ctx.resume()` inside `playNote`
- Added `console.log("playing", stringIndex)` for debugging

#### Rotation fix
- Removed `frameloop="demand"` from Canvas — it blocked `useFrame` from running
- Bumped rotation speed from `0.06` to `0.2`
- Removed conditional guard in `useFrame`

#### Removal
- The entire guitar section was later **removed** from `page.tsx` along with:
  - `src/components/guitar/` directory (Guitar3D.tsx, Guitar.tsx)
  - `src/hooks/useGuitarAudio.ts`
  - All R3F Canvas, OrbitControls, Environment imports from page.tsx

### Current status: **DELETED** — no guitar component exists in the project

---

## Feature 1.5 — Skills Section Enhancements

### What was asked
Enhance the existing Skills section design to match the improved portfolio theme.

### What was done
- Added grid background matching site theme
- Added section header with label pill ("Expertise") + bold heading
- Cards received unique accent colors per skill (yellow/green/purple/blue/gray)
- Colored dot indicators, numbered badges
- Viewport upgraded to wider (`55vw`), `rounded-2xl`, stone-50 bg, inset shadow
- Rod given gradient fade at edges (transparent → stone → transparent) with center dot
- Hover lift animation with spring physics
- Drag hint text below ("← Drag to explore →")

### Current status: **ACTIVE** — separate from Projects section

---

## Feature 2 — 3D Curved Projects Carousel

### What was asked
Build a cinematic 3D curved film-strip carousel for displaying projects:
- Items arranged in a horizontal arc with CSS perspective (1200px)
- Center card focused, side cards rotated away with opacity fade
- Navigation via left/right arrow buttons
- Smooth Framer Motion spring animations
- Cards with gradient backgrounds, tags, titles, descriptions
- Controlled navigation only (no scroll)
- White grid theme must be preserved

### What was done

#### Initial build (Iteration 1)
- Created `src/components/projects/projects.tsx`
- 5 hardcoded projects with unique gradient backgrounds
- Cards positioned via `absolute` centering (`left: 50%, top: 50%`) with translate offsets
- 3D transforms: `rotateY`, `translateX`, `translateZ`, `scale`
- Framer Motion spring animations (`stiffness: 180, damping: 22, mass: 0.8`)
- Circular indexing for seamless looping
- Left/right arrow buttons + dot indicators

#### Upgrade to real 3D perspective (Iteration 2)
- Replaced Framer Motion `animate` with direct CSS `transform` string
- Easing changed to `cubic-bezier(0.22, 1, 0.36, 1)`
- Container height changed from `340px` to `h-[400px]`
- Removed nested wrapper div around cards
- Removed `if (Math.abs(offset) > 2) return null` filter so all cards stay in DOM

#### Sizing upgrade (Iteration 3)
- Card width: `400px` → `420px`
- translateX per offset: `260px` → `360px`
- translateZ per offset: `-150px` → `-220px`
- Center card scale: `1.0` → `1.08`
- Container height: `h-[400px]` → `h-[520px]`

#### Cinematic effects addition (Iteration 4 — then reverted)
- Added: side fade overlays (left/right gradient), depth blur on side cards, rotation boost to `55°`, lighting gradient overlay on cards, hover micro-interaction, center glow upgrade, smoother easing `cubic-bezier(0.19, 1, 0.22, 1)`
- All of these were **later reverted** to keep it clean

#### Final revert (clean version)
- Removed side fade overlays
- Removed blur filter on side cards
- Removed extra gradient lighting overlays
- Removed hover scaling (`whileHover`)
- Kept: `rotateY(55°)`, `translateX(360px)`, `translateZ(-220px)`, center scale `1.08`, smooth transitions, all cards in DOM

#### Design enhancements (current)
- Added grid background matching site theme
- Added label pill ("Portfolio") + bold heading
- Refined navigation buttons with white bg + hover shadow
- Added emoji icons to project cards
- Improved tag styling with smaller text

### Current status: **ACTIVE** — working 3D carousel in page.tsx

---

## Feature 2.5 — GlitchText Component

### What was asked
Create a reusable GlitchText component that applies a cyberpunk-style RGB split glitch effect to any text, with:
- Multiple color layers (red, blue, green, yellow, purple, cyan, orange, pink)
- Font changes (6 different fonts randomly swapped per frame)
- Letter-shape distortion (skew, clip-path, letter-spacing, font-weight)
- Duration of 3-5 seconds on hover/click
- Base text hidden during glitch, reappears after

### What was done
- Created `src/components/ui/GlitchText.tsx` — pure React component, no external dependencies
- 8 color layers with `mixBlendMode: "screen"` for composite RGB split effect
- Each layer independently randomized per 70ms tick: font-family, skew, offset, clip-path, weight, spacing
- `textShadow` glow on each color layer for neon effect
- White flash slice occasionally cuts through all layers
- Base text fades out during glitch (100ms), fades back in when done
- Used in Bot's About panel for "Rishideep Mandavilli" name

### Current status: **ACTIVE** — reusable component in `src/components/ui/`

---

## Feature 3 — Floating Assistant Bot

### What was asked
Create a floating assistant bot in the bottom-right corner:
- Premium mini robot head design (not cartoon, not emoji)
- Eyes that track user's cursor smoothly
- Idle floating animation
- Click → moves to center → opens About Me panel
- ESC to close/exit
- Light theme compatible (white grid background)
- Minimal, clean, premium feel

### What was done

#### Initial build (Iteration 1)
- Created `src/components/ui/Bot.tsx`
- 56×56px rounded square head with stone gradient shell
- Dark screen with two simple eyes + pupils
- Cursor tracking via normalized coordinates + lerp smoothing
- Click → bot translates to screen center via spring animation
- About panel with glassmorphism modal
- Idle float animation (`y: [0, -3, 0]` every 3.5s)

#### Multiple redesigns (Iterations 2-6)
Several iterations went through various designs:
- Full body with torso, feet, hologram projection effects
- Realistic 3D bot head with glossy dark materials, LEDs, scanlines
- Various eye sizes and cursor tracking implementations
- Added body (neck + small torso with chest LED indicator)
- Removed hologram projections, light beams, and complex effects per user request

#### Visibility fix (Iteration 7)
- Bot was invisible due to `initial={{ opacity: 0, y: 30, scale: 0.8 }}` keeping it off-screen
- Nested entry animation added 300ms delay
- Fixed by removing `initial` prop, setting position via `style={{ bottom: 24, right: 24 }}`
- Removed nested animation wrapper

#### Precision rebuild (Iteration 8)
- Reduced eye size from 30px to 18px for subtlety
- Changed accent color from emerald-400 to muted steel blue (#4a9ab5)
- Reduced pupil travel to 4px max
- Removed all cartoon elements (green glow, oversized eyes, blob shapes)
- Simplified to clean minimal design

#### Final rebuild (current — Iteration 9)
- **Simplified to minimal design:** 56×56px head, simple stone-800 screen, two 10px white eyes with 5px stone-700 pupils
- **Added blinking:** Random interval every 2.5-5 seconds, scaleY animation to 0.1 for 140ms
- **Added body:** 44×30px rounded rectangle with stone-200/300 gradient, pulsing chest indicator (opacity 0.3→0.8, 2s cycle), 14×5px neck connector
- **Fixed alignment:** Wrapped neck and body in `flex justify-center` containers to ensure all parts stack centered regardless of their individual widths (head=56px, body=44px)
- **Kept working:** Cursor tracking, click→center→panel, idle float, smooth spring movement

### Current status: **ACTIVE** — floating bot with body, blinking eyes, About Me panel in page.tsx

---

## Feature 4 — Interactive Driving Contact Section

### What was asked
Build an interactive Contact section where the user controls a car:
- Realistic red Ferrari car model
- WASD/Arrow key controls for movement
- 3 sheds (Email, LinkedIn, GitHub) at edges
- Collision detection when car enters shed area
- Contact panel appears on shed entry
- ESC to exit driving mode
- White grid background (not dark)

### What was done

#### Initial build (Iteration 1)
- Created `src/components/contact/Contact.tsx`
- SVG top-down Ferrari car with realistic details
- 2000×1200px world with dot-pattern ground
- Physics: acceleration, friction, steering
- 3 sheds at top/left/right positions
- Contact panel with glassmorphism on collision

#### Major rebuild — 3D with real model (Iteration 2)
- Found Ferrari GLB model in three.js examples repo (raw GitHub URL)
- Replaced 2D canvas with full R3F Canvas
- `useGLTF` loading of Ferrari model with fallback procedural car
- Camera follow system with smooth lerp
- 3D garage structures for sheds
- Contact shadows under car
- Environment preset "studio" for reflections

#### Scale fix (Iteration 3)
- World was 2000×1200 units with car at 0.012 scale → invisible dot
- Reduced world to 200×120 units, car at scale 1.0
- Sheds reduced to 8×5 units (realistic relative to car)
- Camera at 14 units back, 10 units up
- Physics made frame-rate independent with `dt` multiplication

#### Controls direction fix (Iteration 4)
- Ferrari model's nose faces +X in local space, was rotated wrong causing backward movement
- Fixed model rotation to `rotation={[0, -Math.PI/2, 0]}` initially, then removed rotation entirely
- Rebuilt movement system: `x += cos(angle) * speed`, `z += sin(angle) * speed` — forward = +X at angle 0
- Camera follow updated to use same +X forward convention

#### Direction fix final attempt (Iteration 5)
- The forward direction was still misaligned — changed Ferrari rotation to `Math.PI/2` then removed it
- Set movement to use +X as forward (matching the Ferrari model's actual nose direction)
- Rebuilt fallback car to face +X (body elongated along X axis)
- Updated all physics and camera to +X forward convention

### Current status: **DELETED** — entire Contact section removed
- `src/components/contact/` directory deleted
- Import and usage removed from page.tsx
- User decided this feature didn't meet the quality standard

---

## File Structure (Current)

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # Main page: Hero → Skills → Projects → Bot
├── components/
│   ├── hero/                 # Hero section (pre-existing)
│   ├── skills/               # Skills section (pre-existing)
│   ├── projects/
│   │   └── projects.tsx      # 3D curved carousel (ACTIVE)
│   └── ui/
│       └── Bot.tsx           # Floating assistant (ACTIVE)
└── hooks/
    # (empty — useGuitarAudio.ts was deleted)
```

## What's Deleted

| Component | Path | Status |
|---|---|---|
| Guitar3D | `src/components/guitar/Guitar3D.tsx` | **DELETED** |
| Guitar (2D) | `src/components/guitar/Guitar.tsx` | **DELETED** |
| useGuitarAudio | `src/hooks/useGuitarAudio.ts` | **DELETED** |
| Contact (3D drive) | `src/components/contact/Contact.tsx` | **DELETED** |

## What's Active

| Component | Path | Description |
|---|---|---|
| Hero | `src/components/hero/` | Pre-existing hero section |
| SkillsTrack | `src/components/skills/` | Pre-existing skills section |
| Projects | `src/components/projects/projects.tsx` | 3D curved film-strip carousel |
| Bot | `src/components/ui/Bot.tsx` | Floating assistant with body + blinking eyes |

## Dependencies Installed (pre-existing)

- `three`, `@react-three/fiber`, `@react-three/drei` — 3D rendering (currently only used by Projects carousel)
- `framer-motion` — animations (used by Projects carousel and Bot)
- `matter-js` — physics (unused currently)

## Key Design Decisions

1. **No external GLB models for production** — All free 3D model hosts (Sketchfab, Poly.Pizza) use authenticated endpoints with no permanent direct GLB URLs. The Ferrari model used in Contact came from three.js examples repo on GitHub.

2. **Procedural > external when possible** — The guitar was built procedurally because no GLB was available. The Projects carousel uses CSS gradients instead of images.

3. **Light theme throughout** — All components respect the white grid background. No dark full-section overlays. Components use `bg-background`, `text-foreground`, and stone color tokens.

4. **Bot kept minimal** — After multiple iterations of complex designs (holograms, projections, 3D models), the bot was simplified to a clean 56×56px head + small body with blinking eyes.

5. **Contact section removed** — The driving contact experience didn't meet quality standards after multiple rebuilds and was deleted entirely.

---

## How to Continue

If handing this project to another developer or returning after time away:

1. The **Hero** and **Skills** sections are pre-existing and untouched
2. The **Projects carousel** is a clean 3D curved carousel with 5 projects
3. The **Bot** is a minimal floating assistant with body and blinking eyes
4. The **Guitar** and **Contact** sections have been fully removed
5. Three.js dependencies remain installed but are only actively used by the Projects carousel

To add new features: follow the existing pattern of creating components in `src/components/` and importing them in `src/app/page.tsx`.

---

## Pre-existing Components (never touched or modified)

These components existed before our work started and were never changed:

| Component | Path | Notes |
|---|---|---|
| Hero | `src/components/hero/` | Main landing hero |
| SkillsTrack | `src/components/skills/` | Skills section with horizontal track |
| globals.css | `src/app/globals.css` | Global styles, white grid theme |
| layout.tsx | `src/app/layout.tsx` | Root layout file |
| package.json | root `package.json` | All dependencies were pre-installed |
| tsconfig.json | root `tsconfig.json` | TypeScript configuration |
| postcss.config.mjs | root `postcss.config.mjs` | PostCSS configuration |
| next-env.d.ts | root `next-env.d.ts` | Next.js environment types |

## Build & Verification

- Every single change was verified with `npx next build` — all builds passed cleanly
- No compile errors, no type errors, no lint failures throughout the entire development
- Final bundle size: ~290 kB (first load JS ~392 kB) after all deletions
- All pages render as static content (`○ Static` in build output)
- Dev server command: `npm run dev`
- Production build command: `npm run build`
- Start production: `npm run start`

## Complete Project Inventory (every file ever created or deleted)

### Currently exists:
```
src/app/page.tsx                    — Main page (Hero → Skills → Projects → Bot)
src/app/layout.tsx                  — Root layout (pre-existing)
src/app/globals.css                 — Global styles (pre-existing)
src/components/hero/                — Hero section (pre-existing)
src/components/skills/              — Skills section (pre-existing)
src/components/projects/projects.tsx — 3D curved carousel (BUILT + ACTIVE)
src/components/ui/Bot.tsx           — Floating assistant (BUILT + ACTIVE)
```

### Created then deleted:
```
src/components/guitar/Guitar.tsx       — Original 2D guitar (deleted)
src/components/guitar/Guitar3D.tsx     — 3D guitar with R3F (deleted)
src/hooks/useGuitarAudio.ts            — Web Audio API hook (deleted)
src/components/contact/Contact.tsx     — 3D driving contact section (deleted)
```

## Detailed Notes on Each Feature for Future Context

### Guitar — Why it failed
- No public GLB URLs exist for free guitar models (Sketchfab, Poly.Pizza all require auth)
- Procedural LatheGeometry approach worked but strings were problematic to align
- Every iteration of string fixes (position, rotation, length, visibility) revealed new issues
- Audio worked perfectly once AudioContext resume was handled on first click

### Projects Carousel — What works well
- The CSS transform approach (`rotateY`, `translateX`, `translateZ`) works better than Framer Motion `animate` for 3D
- Keeping all cards in DOM at all times is essential — conditionally rendering causes flicker
- Circular indexing for seamless looping is the correct approach
- The `cubic-bezier(0.22, 1, 0.36, 1)` easing gives the most premium feel

## Feature 5 — Contact Node Editor (n8n-style workflow)

### What was asked
Build an interactive Contact section as a node-based workflow editor similar to n8n:
- Central "Contact" trigger node (left side)
- 6 target nodes (Email, GitHub, LinkedIn, Instagram, X, Website) arranged in a column (right side)
- n8n-style rectangular node cards with colored header strips, icon boxes, descriptions
- Small circular connection ports on edges (output on right of source, input on left of targets)
- Drag from output port → bezier S-curve follows cursor → snap to input port → release to connect
- Animated flowing dots on connections
- Click existing connection or node to re-trigger action
- Clean white dot-grid background (like node editors)
- Corner metadata labels, status bar with connection count
- Must NOT drag the entire canvas — only the connection line moves
- Must fit the portfolio's light theme perfectly

### What was done

#### Initial rebuild (Iteration 1 — radial nodes)
- Started with radial node layout (center circle + surrounding circles)
- Drag from center creates bezier connection lines
- Nodes scale up when nearby, connection locks on release
- Worked visually but didn't match n8n style request

#### n8n-style canvas rebuild (Iteration 2 — SSR bug)
- Switched to rectangular node cards with colored header strips
- Added output/input ports on card edges
- Cubic bezier S-curves (`M C` path with 50% curvature)
- Canvas with dot grid background, status bar
- **Broke**: SSR early-return (`if (!mounted) return <section>`) caused blank screen — the placeholder bypassed the main layout and client rehydration never recovered

#### Fixed SSR + visibility (Iteration 3)
- Removed the SSR fallback entirely
- Canvas renders immediately with explicit defaults (`W=960, H=520`)
- Positions computed inline from state — no refs, no async layout
- Resize updates dimensions after mount — canvas visible before this runs
- Fixed the blank screen issue permanently

#### Design enhancement (Iteration 4)
- Enlarged nodes: `192×68px` cards with `backdrop-blur-sm` + `bg-white/90`
- Icon boxes with colored tint backgrounds and borders
- Status dots on each node (colored when connected)
- Flowing dot animation on connections (`<animateMotion>` loop)
- Drag line changes to target color when snapped
- Source node with lightning bolt icon, 3-stop gradient header strip

#### Port and drag fix (Iteration 5 — current)
- **Source port moved to RIGHT edge** of Contact card (`left: SRC_W - 8`)
- Port visual: 16×16px with inner colored dot, grab cursor
- **Fixed canvas dragging**: `e.preventDefault()` on pointer events + `touchAction: "none"` + `userSelect: "none"` + `draggable={false}` — prevents the entire section from being dragged like an image
- **Dual flow dots** per connection: two animated dots offset by 2s traveling along bezier paths
- **Rotating dashed ring** around cursor when snapped to port
- Corner metadata labels: `canvas:contact_flow` (left), `nodes: 6 · edges: X` (right)
- Status bar: monospace font, `X/6 edges`, arrow indicator (`→ GitHub`) when snapped
- All target nodes have input ports on LEFT edge with colored fill on connect/snap

### Current status: **ACTIVE** — n8n-style node editor in page.tsx

---

## Updated File Structure (Current)

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # Main page: Hero → Skills → Projects → Contact → Bot
├── components/
│   ├── hero/                 # Hero section (pre-existing)
│   ├── skills/
│   │   └── skills-track.tsx  # Draggable horizontal skills cards (ACTIVE)
│   ├── projects/
│   │   └── projects.tsx      # 3D curved carousel (ACTIVE)
│   ├── contact/
│   │   └── Contact.tsx       # n8n-style node editor (ACTIVE)
│   └── ui/
│       ├── Bot.tsx           # Floating assistant with body + blink (ACTIVE)
│       └── GlitchText.tsx    # Reusable RGB glitch text component (ACTIVE)
└── hooks/
    # (empty — useGuitarAudio.ts was deleted)
```

## Updated What's Active

| Component | Path | Description |
|---|---|---|
| Hero | `src/components/hero/` | Pre-existing hero section |
| SkillsTrack | `src/components/skills/skills-track.tsx` | Draggable horizontal skills track |
| Projects | `src/components/projects/projects.tsx` | 3D curved film-strip carousel |
| Contact | `src/components/contact/Contact.tsx` | n8n-style node editor workflow |
| Bot | `src/components/ui/Bot.tsx` | Floating assistant with body + blinking eyes |
| GlitchText | `src/components/ui/GlitchText.tsx` | Reusable RGB glitch text component |

## Updated What's Deleted

| Component | Path | Status |
|---|---|---|
| Guitar3D | `src/components/guitar/Guitar3D.tsx` | **DELETED** |
| Guitar (2D) | `src/components/guitar/Guitar.tsx` | **DELETED** |
| useGuitarAudio | `src/hooks/useGuitarAudio.ts` | **DELETED** |
| Contact (3D drive, old) | `src/components/contact/Contact.tsx` | **REPLACED** by n8n-style version |
| SkillsToProjects (morph) | `src/components/transition/SkillsToProjects.tsx` | **REVERTED** — didn't meet quality standard |

---

## Detailed Notes on Each Feature for Future Context

### Guitar — Why it failed
- No public GLB URLs exist for free guitar models (Sketchfab, Poly.Pizza all require auth)
- Procedural LatheGeometry approach worked but strings were problematic to align
- Every iteration of string fixes (position, rotation, length, visibility) revealed new issues
- Audio worked perfectly once AudioContext resume was handled on first click

### Projects Carousel — What works well
- The CSS transform approach (`rotateY`, `translateX`, `translateZ`) works better than Framer Motion `animate` for 3D
- Keeping all cards in DOM at all times is essential — conditionally rendering causes flicker
- Circular indexing for seamless looping is the correct approach
- The `cubic-bezier(0.22, 1, 0.36, 1)` easing gives the most premium feel

### Bot — What finally worked
- Simple is better — after 9 iterations, the minimal design is the most polished
- Blinking adds life without complexity (random interval + scaleY animation)
- Body with `flex justify-center` wrappers solved the alignment issue where neck/body parts were offset
- Cursor tracking with normalized coordinates and lerp smoothing feels natural
- The About panel with glassmorphism (`bg-white/80 backdrop-blur-xl`) is premium without being complex

### Contact (3D Driving) — Why it was abandoned
- The Ferrari GLB model from three.js examples has its nose facing +X, which is non-standard
- This caused 5 iterations of direction confusion between +X and +Z forward conventions
- Even after fixing, the overall quality didn't meet the premium standard expected
- Lesson learned: if a 3D model's orientation isn't known upfront, build a simple fallback first

### Contact (Node Editor) — What works
- SSR early-return was the #1 cause of blank screen — removed entirely
- Canvas must render immediately with explicit dimensions, no async layout dependency
- `e.preventDefault()` on pointer events + `touchAction: "none"` + `draggable={false}` prevents canvas drag
- Bezier S-curves with `M C` path and 50% distance curvature look identical to n8n
- `<animateMotion>` for flowing dots is smooth and performant (SVG native, no JS animation)
- Port positioning on card edges must use fixed pixel offsets, not flexbox centering

### Common mistakes made across features (avoid these):
1. Using `initial={{ opacity: 0 }}` on fixed-position elements — makes them invisible until animation runs
2. Nesting motion.div wrappers — causes animation conflicts with parent transforms
3. Using `Math.PI/2` rotations without verifying the model's actual forward axis
4. Building complex features before verifying the basic version works
5. Not checking if public GLB URLs actually exist before committing to a 3D approach
6. **SSR early-return bypassing main layout** — causes blank screen that never recovers
7. **Missing `e.preventDefault()` on pointer events** — causes entire canvas to drag like an image
8. **Layout positions in refs** — they're empty during SSR, causing `undefined` crashes
9. **`layoutId` with absolute positioning + 3D transforms** — causes conflicts, prefer `animate` with explicit targets

### What to know if rebuilding any of these:
- The Projects carousel is the cleanest, most stable feature — use it as a reference pattern
- The Bot's blinking system (random timer + scaleY) is reusable for any animated UI element
- Web Audio API hook pattern (from useGuitarAudio) is solid for any future sound features
- Three.js R3F Canvas setup (lighting, shadows, environment, camera follow) is proven from the old Contact section
- The n8n Contact node editor uses pure SVG animations (`animateMotion`, `animateTransform`) — no JS animation overhead
- The morphing transition attempt showed that `layoutId` doesn't work well with 3D transforms — use `animate` with explicit position/size targets instead

---

## Latest Enhancements (Current)

### Mask Reveal — Fixes Applied

| Issue | Root Cause | Fix |
|---|---|---|
| Image stayed partially revealed after hover left | rAF loop only updated mask when `hovering` was true — didn't close it when false | `handleLeave` now **immediately** calls `setHidden()` which sets mask to `circle 0px`. rAF loop only updates when hovering, otherwise does nothing (mask stays hidden). |
| Image not fully hidden on mount | Mask not set until first interaction | `useEffect` runs `setHidden()` on mount before starting rAF |
| Reveal area too large | Radius 160px was oversized | Reduced to **100px** |
| Container too large | 400×480px felt cramped relative to hero text | Resized to **380×440px** |
| No visual hint when hidden | Blank box with no guidance | Added **centered hint overlay** (eye icon + "Hover to reveal") with `opacity` transition |
| Laggy feel | `SMOOTHING = 0.15` was too snappy | Changed to **0.12** for smoother tracking |

**How it works now:**
- On mount: mask set to `circle 0px` — fully hidden
- On `mouseMove`: position stored in ref, `hovering` set to true, rAF applies mask each frame
- On `mouseLeave`: `setHidden()` called immediately — mask closed in the same tick
- No React state updates during animation — all DOM writes via `imgRef.current.style`

### Bot — Glossy Color-Shift Redesign

| Enhancement | Detail |
|---|---|
| **Color-shifting** | Gradient across head, neck, body: `#c4b5a0 → #a89b8c → #8b7d6b → #a89b8c → #c4b5a0` cycling over 5 seconds |
| **Background size** | `300% 300%` — wider range makes the color shift more noticeable |
| **Animation** | `@keyframes botGradient` — standard `<style>` tag (not `styled-jsx`) for reliable injection |
| **Glossy reflection** | Head: `from-white/30 via-white/10 to-transparent`. Body: `from-white/15`. |
| **Edge highlight** | `border-white/15` inner ring on head |
| **Body alignment** | All parts use `flex justify-center` wrappers. Neck centered, body centered, shadow centered via `left-1/2 -translate-x-1/2`. |
| **Chest LED** | Pulsing dot at exact center of body |

### Section Transitions
- `SectionReveal` wrapper in `page.tsx` — each section fades in + slides up 40px on scroll
- Hero fades out on scroll (opacity 1→0, y 0→-20px)

### Consistent Background
- `globals.css` background: `#ffffff` (pure white)
- `GridBackground` layout wrapper provides 60px grid across entire page
- Individual sections don't override backgrounds

### Skills Section Fixes
- Center dot removed (was stuck in middle, not moving with cards)
- Cards enlarged: 320×220px, viewport `70vw` max 1050px
- Holes at top of cards — rod passes through
- Drag prevention: `touchAction: "none"`, `userSelect: "none"`, `draggable={false}`
- Physics: `dragElastic: 0.08`, `bounceStiffness: 300`, `bounceDamping: 20`

---

## Hero Section Overhaul (Current)

### Working Navigation Buttons
| Issue | Fix |
|---|---|
| "View Projects" and "Contact" buttons were `<Link href="#projects">` with no matching element IDs | Replaced with `<button>` elements that use `scrollIntoView({ behavior: "smooth" })` on actual section refs passed down from `page.tsx` |
| Section refs defined in `page.tsx` and passed as props to Hero | `skillsRef`, `projectsRef`, `contactRef` — each wraps its section component |
| Inner components changed from `<section>` to `<div>` to avoid nested section conflicts | SkillsTrack, Projects, Contact all now render `<div>` wrappers |

### Magnetic Text — Larger Interactive Area
| Change | Before | After |
|---|---|---|
| Text layout | Single line "Rishideep Mandavilli" | **Two lines**: "Rishideep" / "Mandavilli" — fills more vertical space |
| Font size | 180px | **220px** |
| Particle spacing | 5px | **6px** (slightly more spread) |
| Particle size | 0.03 | **0.035** |
| Opacity | 1.0 | **0.9** (subtle transparency) |
| Repel radius | 0.8 | **0.9** |
| Repel strength | 0.6 | **0.7** |
| Canvas height | `h-64 md:h-72` | **`h-80 md:h-96`** (320px → 384px) |
| Canvas style | `bg-white/60` | **`bg-white/70`** with lighter border |
| Camera | Fixed `position: [0,0,4]` | **`AutoCamera`** component adjusts FOV (50-60°) and Z position (3.2-3.8) based on viewport aspect ratio |

### Hero Design Enhancements
- Status badge: smaller dots (`h-2 w-2`), tighter text (`text-[11px]`)
- Canvas rounded corners with softer border (`border-stone-200/50`)
- Shadow deepened slightly (`0_2px_16px`)
- Subtext: `text-base md:text-lg` for better proportion
- Buttons: `cursor-pointer` added, arrow icon on View Projects with hover slide animation
- Mask reveal container: 380×440px, centered hint with eye icon when not hovering

---

## Latest Updates (April 2025)

### Theme Change — Dark Background

**What was changed:**
- Changed from white grid background to **black background** with subtle white grid
- `globals.css` now has:
  - `--color-background: #000000`
  - `--color-foreground: #e7e5e4`
  - Grid lines: `rgba(255,255,255,0.05)`
- Removed old `GridBackground` component that had Matrix rain and node graph

### Interactive Features Added

#### 1. Animated Background Particles
- Created `src/components/ui/AnimatedBackground.tsx`
- 50 floating particles with gradient glow
- Smooth fade in/out animation
- No connecting lines between particles
- Colors shift between green/teal hues

#### 2. Time Greeting
- Created `src/components/ui/TimeGreeting.tsx`
- Shows "Good morning/afternoon/evening/night" based on current hour
- Icon changes based on time (🌅/☀️/🌆/🌙)
- Displayed in Hero section below the status badge

#### 3. Header Navigation
- Created `src/components/ui/Header.tsx`
- Fixed navigation bar at top with smooth scroll
- Links: Home, Skills, Projects, Contact, About
- Hover underline effect
- Background changes on scroll (transparent → dark)
- Logo on left, nav links on right

### Bot Panel Improvements

#### Sequential Animation (New)
- **Problem:** Bot movement and panel opening happened simultaneously
- **Solution:** Staged animation sequence:
  1. Click bot → bot moves to center of viewport (spring animation, ~600ms)
  2. Wait 200ms after bot reaches center  
  3. Panel projects with 400ms fade-in animation
- Bot moves slower: stiffness 80, damping 24, mass 1
- Uses separate `botAtCenter` and `panelVisible` states for sequential control

#### Panel Close Animation
- Backdrop: 0.4s fade
- Card: scale 1→0.9, y: 0→15 with 0.4s duration

### Contact Section Fixes

#### Get in Touch Visibility Issue
- **Problem:** "Get in Touch" heading disappeared when scrolled
- **Fix:** 
  - Added `py-20` padding to section
  - Made header badge more visible with `bg-white/10` instead of `bg-white/30`
  - Changed scroll animation trigger to `["start end", "start center"]`

### Page Navigation Fixes

#### Hero Section Not Showing First
- **Problem:** Projects section appeared first on page refresh
- **Fix:** Added `useEffect` to scroll to top on mount:
  ```tsx
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  ```

#### About Tab Linking
- **Problem:** About tab in header needed to open Bot panel
- **Solution:** 
  - Added `scrollTo` function in page.tsx that handles "#about" specially
  - When About is clicked, it opens the Bot panel directly
  - Bot now accepts `open` and `onOpenChange` props for external control

### SectionReveal Animation Tweak
- Changed scroll trigger from `["start 0.85", "start 0.25"]` to `["start end", "start center"]`
- Reduces conflict with header, ensures content visible longer

### Removed Features

1. **Cursor Trail** - Initially implemented but removed per user request
2. **Draggable Cards** - Attempted to add floating draggable elements but removed due to implementation issues
3. **GridBackground Component** - Removed dark Matrix rain version, now just using CSS grid in globals.css

### Current File Structure

```
src/
├── app/
│   ├── globals.css              # Black background + grid
│   ├── layout.tsx               # Root layout with AnimatedBackground
│   └── page.tsx                 # Main page with Header, Hero, Skills, Projects, Contact, Bot
├── components/
│   ├── hero/
│   │   ├── hero.tsx             # Hero section with MagneticText + MaskReveal + TimeGreeting
│   │   ├── MagneticText.tsx     # 3D particle grid
│   │   └── MaskReveal.tsx       # Hover to reveal profile image
│   ├── skills/
│   │   └── Skills-any.tsx       # Skills section
│   ├── projects/
│   │   └── ProjectsTerminal.tsx # Projects carousel
│   ├── contact/
│   │   └── Contact.tsx          # n8n-style node editor
│   └── ui/
│       ├── Header.tsx           # Navigation header
│       ├── Bot.tsx              # Floating assistant with sequential animation
│       ├── GlitchText.tsx       # RGB glitch text effect
│       ├── TimeGreeting.tsx     # Time-based greeting
│       ├── AnimatedBackground.tsx # Floating particles
│       └── VerticalStrap.tsx    # Scrolling info strap
```

### Build Commands

- Development: `npm run dev`
- Production build: `npm run build`
- Start production: `npm run start`

# Easy Form Maker
Easy Form Maker คือเครื่องมือสร้างแบบฟอร์มออนไลน์พื้นฐานที่ใช้งานง่าย ช่วยให้คุณสามารถสร้างและจัดการแบบฟอร์มได้อย่างรวดเร็ว โดยไม่ต้อง login!

[![Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://efm-black.vercel.app)

https://efm-black.vercel.app

## How to Run Locally

1. Clone the repository
   ```bash
   git clone https://github.com/kodchanat2/efm
   cd efm
   ```

2. Install dependencies
   ```bash
   yarn install
   ```
<!-- setup env -->
3. Create a `.env.local` file in the root directory and add the following environment variables:
    ```bash
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your-project-id
    VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```
4. Start the development server
   ```bash
   yarn dev
   ```

## เทคโนโลยีที่ใช้
- Vue 3
- Vite
- Firebase Firestore
- Pinia
- Tailwind CSS
- shadcn-vue

## แนวคิดการออกแบบ
ต้องการ Form ที่ใช้งานง่ายและรวดเร็วโดยไม่ต้อง login เพื่อสร้างแบบฟอร์ม
และต้องเป็น Mobile-First Design โดยออกแบบให้ component มีความ dynamic มากที่สุด เพื่อให้เพิ่ม input ในภายหลังได้ง่าย
โดยมี reference จาก: 
- [Google Forms](https://forms.google.com) สำหรับ UX ที่ non-technical user สามารถใช้งานได้ง่าย
- [Typeform](https://www.typeform.com) Form UI ที่ minimal และดู clean
- [link tree](https://linktr.ee) สำหรับการจัดวาง layout ที่เรียบง่าย
- [VueForm](https://vueform.com) reference ของการออกแบบ schema และ builder

## การตัดสินใจที่สำคัญ
- เนื่องจากต้องการให้ UX-friendly มากที่สุด จึงใช้เวลา research และออกแบบ UI/UX เป็นอย่างมาก จนทำให้ใช้เวลาพัฒนา feature อื่นๆ ช้าลง
- UI library เลือกใช้ shadcn เนื่องจากความเคยชิน แต่ด้วยความแตกต่างของ core library ระหว่าง React กับ Vue ทำให้ต้องใช้เวลาศึกษา Docs ค่อนข้างมาก

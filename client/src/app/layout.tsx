import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '../store/provider';
import store from '../store/store';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zurich Assessment'
}

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       {/* <Provider store={store}>{children}</Provider> */}
//       <body className={inter.className}>{children}</body>
//     </html>
//   )
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className={styles.wrapper}>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}

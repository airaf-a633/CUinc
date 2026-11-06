import { useId } from 'react';
import Svg, { Defs, Ellipse, Path, RadialGradient, Stop } from 'react-native-svg';

import { colors } from '@/theme/tokens';

// Icons are redrawn from the SVGs exported from Figma (assets/svg). The Figma gradients are
// ellipses defined with gradientTransform; here they are converted to bounding-box percentages
// (cx/cy/r) because rx/ry are ignored by browsers and gradientTransform is unreliable on native.

// Gradient ids must be unique per instance: screens stay mounted (hidden) in the stack, and a
// hidden <svg> that defines the same id makes url(#id) fail for the visible one.
const useUid = () => useId().replace(/[^a-zA-Z0-9]/g, '');

export function DropletLogo({ width = 25, height = 35 }: { width?: number; height?: number }) {
  const uid = useUid();
  const gid = `drop${uid}`;
  return (
    <Svg width={width} height={height} viewBox="0 0 25 35" fill="none">
      <Defs>
        <RadialGradient id={gid} cx="85.3%" cy="-4%" r="147.6%">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="1" stopColor={colors.primary} />
        </RadialGradient>
      </Defs>
      <Path
        d="M24.1658 23.4881C23.7034 29.9125 18.4666 34.8836 12.1611 34.8836C5.85572 34.8836 0.61889 29.9125 0.156511 23.4881C0.091696 16.7151 12.1287 0.189453 12.1287 0.189453C12.1287 0.189453 24.1658 16.7151 24.1658 23.4881Z"
        fill={`url(#${gid})`}
      />
    </Svg>
  );
}

/** Splash logo: droplet inside a rounded square (cleaned of the stray frame shapes in the export). */
export function SplashLogo({ size = 77 }: { size?: number }) {
  const uid = useUid();
  const sq = `sq${uid}`;
  const sd = `sd${uid}`;
  return (
    <Svg width={size} height={size} viewBox="0 0 77 77" fill="none">
      <Defs>
        <RadialGradient id={sq} cx="49.07%" cy="62.55%" r="60.63%">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="1" stopColor={colors.primary} />
        </RadialGradient>
        <RadialGradient id={sd} cx="85.35%" cy="-4.06%" r="147.4%">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="1" stopColor={colors.primary} />
        </RadialGradient>
      </Defs>
      <Path
        d="M0.125 9.6C0.125 4.29807 4.42307 0 9.725 0H65.647C70.9489 0 75.2469 4.29807 75.2469 9.6V67.4C75.2469 72.7019 70.9489 77 65.6469 77H9.72498C4.42305 77 0.125 72.7019 0.125 67.4V9.6Z"
        fill={`url(#${sq})`}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7956 0H62.5764C69.5741 0 75.2469 5.81463 75.2469 12.9873V64.0127C75.2469 71.1854 69.5741 77 62.5764 77H12.7956C5.79781 77 0.125 71.1854 0.125 64.0127V12.9873C0.125 5.81463 5.79781 0 12.7956 0ZM72.7429 12.9873C72.7429 7.23216 68.1912 2.56667 62.5764 2.56667H12.7956C7.18076 2.56667 2.62907 7.23216 2.62907 12.9873V64.0127C2.62907 69.7678 7.18076 74.4333 12.7956 74.4333H62.5764C68.1912 74.4333 72.7429 69.7678 72.7429 64.0127V12.9873Z"
        fill="#0071BC"
      />
      <Path
        d="M53.9636 45.9815C53.3384 54.6973 46.2572 61.4415 37.731 61.4415C29.2048 61.4415 22.1236 54.6973 21.4984 45.9815C21.4108 36.7929 37.6872 14.373 37.6872 14.373C37.6872 14.373 53.9636 36.7929 53.9636 45.9815Z"
        fill={`url(#${sd})`}
      />
    </Svg>
  );
}

export function MenuIcon() {
  return (
    <Svg width={22} height={20} viewBox="0 0 22 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.8421 0.327148C21.4816 0.327148 22 0.913422 22 1.63667C22 2.35992 21.4816 2.9462 20.8421 2.9462H1.15789C0.518417 2.9462 0 2.35992 0 1.63667C0 0.913422 0.518417 0.327148 1.15789 0.327148H20.8421ZM11.2769 8.21405C11.9164 8.21405 12.4348 8.80033 12.4348 9.52358C12.4348 10.2468 11.9164 10.8331 11.2769 10.8331H1.15789C0.518419 10.8331 0 10.2468 0 9.52358C0 8.80033 0.518419 8.21405 1.15789 8.21405H11.2769ZM21.0435 17.4105C21.0435 16.6872 20.5251 16.101 19.8856 16.101H1.15789C0.518417 16.101 0 16.6872 0 17.4105C0 18.1337 0.518417 18.72 1.15789 18.72H19.8856C20.5251 18.72 21.0435 18.1337 21.0435 17.4105Z"
        fill="#3B4045"
      />
    </Svg>
  );
}

export function BackArrow() {
  return (
    <Svg width={18} height={13} viewBox="0 0 18 13" fill="none">
      <Path
        d="M0.480469 6.48047C0.480469 6.33432 0.571976 6.14027 0.664822 6.0461L5.89551 0.677591C6.13972 0.433708 6.53537 0.405445 6.82008 0.65296C7.07463 0.874233 7.08097 1.30579 6.84558 1.54607L2.64673 5.84876H16.8266C17.1877 5.84876 17.4805 6.13152 17.4805 6.48034C17.4805 6.82916 17.1877 7.11195 16.8266 7.11195H2.64673L6.84558 11.4146C7.08094 11.6549 7.06423 12.0758 6.82008 12.3077C6.5623 12.5525 6.136 12.5307 5.89551 12.2831L0.664822 6.91461C0.511135 6.769 0.483051 6.62876 0.480469 6.48047Z"
        fill="#3B4045"
        stroke={colors.text}
        strokeWidth={0.96}
      />
    </Svg>
  );
}

export function AlertIcon() {
  return (
    <Svg width={23} height={20} viewBox="0 0 23 20" fill="none">
      <Path
        d="M10.0393 1.8093L1.40026 16.1447C1.18666 16.4781 1.13919 16.9067 1.23412 17.3115C1.32906 17.7164 1.61386 18.0497 1.96986 18.2641C2.2072 18.4069 2.46827 18.4784 2.72934 18.4784H20.0311C20.4583 18.4784 20.8381 18.3117 21.1229 18.0021C21.6213 17.502 21.7162 16.74 21.3602 16.1447L12.7449 1.8093C12.294 1.0711 11.2972 0.832971 10.5614 1.30923C10.3478 1.42829 10.1817 1.6188 10.0393 1.8093Z"
        fill={colors.error}
      />
      <Ellipse cx={11.3922} cy={14.8597} rx={1.06801} ry={1.07158} fill="#FFFFFF" />
      <Path
        d="M11.3926 12.2873C11.1316 12.2873 10.918 12.073 10.918 11.811V5.6911C10.918 5.42916 11.1316 5.21484 11.3926 5.21484C11.6537 5.21484 11.8673 5.42916 11.8673 5.6911V11.811C11.8673 12.073 11.6537 12.2873 11.3926 12.2873Z"
        fill="#FFFFFF"
      />
    </Svg>
  );
}

export function PinIcon({ color }: { color: string }) {
  return (
    <Svg width={19} height={24} viewBox="0 0 19 24" fill="none">
      <Path
        fillRule="evenodd"
        d="M9.40962 24C7.71071 22.7577 6.13465 21.3419 4.70481 19.7734C3.44604 18.4194 2.35965 16.9019 1.47245 15.2582C0.55156 13.6031 0.0451542 11.7326 7.40035e-07 9.81933C-0.000737257 7.87746 0.550515 5.97899 1.58401 4.36413C2.6175 2.74928 4.08679 1.49061 5.80597 0.747378C7.52515 0.00415021 9.41696 -0.190235 11.242 0.188818C13.0671 0.567871 14.7434 1.50333 16.0589 2.87683C16.9351 3.78659 17.6299 4.86855 18.1031 6.06017C18.5763 7.2518 18.8184 8.52946 18.8156 9.81933C18.7703 11.7316 18.2643 13.6011 17.3442 15.2555C16.4567 16.899 15.3703 18.4165 14.1118 19.7707C12.6824 21.3396 11.1063 22.7555 9.40703 23.9973L9.40962 24ZM9.40962 5.79561C8.55665 5.79583 7.72289 6.05997 7.01377 6.55463C6.30465 7.0493 5.75202 7.75228 5.42574 8.57469C5.09947 9.39709 5.0142 10.302 5.18073 11.175C5.34727 12.0479 5.75811 12.8498 6.36132 13.4791C6.96454 14.1084 7.73303 14.5369 8.56962 14.7105C9.40622 14.8841 10.2733 14.7949 11.0614 14.4542C11.8494 14.1135 12.5229 13.5367 12.9968 12.7966C13.4706 12.0565 13.7236 11.1864 13.7236 10.2963C13.7223 9.10283 13.2674 7.95865 12.4586 7.11486C11.6498 6.27107 10.5533 5.79661 9.40962 5.79561Z"
        fill={color}
      />
    </Svg>
  );
}

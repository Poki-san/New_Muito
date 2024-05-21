import * as React from "react"
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg"

// Меню
export function HeartMenuIcon({color='#fff'}) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M12 21c1 0 10-5 10-12 0-3.5-3-5.956-6-6-1.5-.021-3 .5-4 2-1-1.5-2.526-2-4-2-3 0-6 2.5-6 6 0 7 9 12 10 12z"
        fill={color}
      />
    </Svg>
  )
}

export function MapMenuIcon({color='#fff'}) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.25 10.5c0-5.47 4.393-9.25 9.75-9.25s9.75 3.78 9.75 9.25c0 4.17-1.866 7.233-3.984 9.239a13.29 13.29 0 01-3.183 2.24c-.976.484-1.912.77-2.583.77-.67 0-1.607-.286-2.583-.77a13.29 13.29 0 01-3.183-2.24C4.116 17.733 2.25 14.671 2.25 10.5zM16 9.334C16 12.056 12.4 14 12 14c-.4 0-4-1.944-4-4.666C8 7.972 9.2 7 10.4 7c.59 0 1.2.195 1.6.778.4-.583 1-.786 1.6-.778 1.2.017 2.4.972 2.4 2.334z"
        fill={color}
      />
    </Svg>
  )
}

export function AddEventIcon({color='#fff'}) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <G clipPath="url(#clip0_28572_5700)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.566 1.25H12.434c1.651 0 2.937 0 3.968.084 1.047.086 1.897.262 2.662.652a6.75 6.75 0 012.95 2.95c.39.765.566 1.615.652 2.662.084 1.031.084 2.317.084 3.968V12.434c0 1.651 0 2.937-.084 3.968-.086 1.047-.262 1.897-.652 2.662a6.75 6.75 0 01-2.95 2.95c-.765.39-1.615.566-2.662.652-1.031.084-2.317.084-3.968.084H11.566c-1.651 0-2.937 0-3.968-.084-1.047-.086-1.897-.262-2.662-.652a6.75 6.75 0 01-2.95-2.95c-.39-.765-.566-1.615-.652-2.662-.084-1.031-.084-2.317-.084-3.968V11.566c0-1.651 0-2.937.084-3.968.086-1.047.262-1.897.652-2.662a6.75 6.75 0 012.95-2.95c.765-.39 1.615-.566 2.662-.652 1.031-.084 2.317-.084 3.968-.084zM12.75 8a.75.75 0 00-1.5 0v3.25H8a.75.75 0 000 1.5h3.25V16a.75.75 0 001.5 0v-3.25H16a.75.75 0 000-1.5h-3.25V8z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_28572_5700">
          <Path fill={color} d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export function ProfileMenuIcon({color='#fff'}) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <G clipPath="url(#clip0_28572_5695)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.25 6a4.75 4.75 0 119.5 0 4.75 4.75 0 01-9.5 0zm1.55 7.25a5.55 5.55 0 00-5.55 5.55 3.95 3.95 0 003.95 3.95h9.6a3.95 3.95 0 003.95-3.95 5.55 5.55 0 00-5.55-5.55H8.8z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_28572_5695">
          <Path fill={color} d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
// Меню

export function SettingIcon(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M16 16h.001M16 10.667h.001M16 21.333h.001"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function ModalCloseIcon({opacity=0.5}) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M17.5 9.25l-5.5 5.5-5.5-5.5"
        stroke="#fff"
        strokeOpacity={opacity}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function WarningIcon(props) {
  return (
    <Svg
      width={23}
      height={23}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5 1.142c-1.234 0-2.157.75-3 1.843-.834 1.079-1.725 2.67-2.856 4.689l-.033.06-1.57 2.802-.032.059c-1.086 1.938-1.943 3.469-2.411 4.7-.475 1.252-.629 2.397-.02 3.435.608 1.038 1.682 1.464 3.006 1.66 1.303.194 3.058.194 5.28.194h3.273c2.222 0 3.976 0 5.28-.194 1.324-.196 2.398-.622 3.006-1.66.609-1.038.455-2.183-.02-3.434-.468-1.232-1.325-2.763-2.41-4.701l-.034-.06-1.57-2.802-.033-.06c-1.13-2.018-2.021-3.61-2.854-4.688-.845-1.093-1.768-1.843-3.002-1.843zm.75 7.73a.75.75 0 00-1.5 0v3.372a.75.75 0 101.5 0V8.871zm.094 5.902a.843.843 0 11-1.687 0 .843.843 0 011.687 0z"
        fill="#BC1115"
      />
    </Svg>
  )
}

export function RegHeartIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_28572_6908)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.985 1.868H15.015c1.092 0 1.957 0 2.655.057.713.058 1.317.18 1.868.46a4.75 4.75 0 012.076 2.077c.28.55.402 1.155.46 1.868.058.698.058 1.563.058 2.655V15.015c0 1.092 0 1.957-.057 2.655-.059.713-.18 1.317-.461 1.868a4.75 4.75 0 01-2.076 2.076c-.551.28-1.155.402-1.868.46-.698.058-1.563.058-2.655.058H8.985c-1.092 0-1.957 0-2.655-.057-.713-.059-1.317-.18-1.868-.461a4.75 4.75 0 01-2.076-2.076c-.281-.551-.403-1.155-.46-1.868-.058-.698-.058-1.563-.058-2.655V8.985c0-1.092 0-1.957.057-2.655.058-.713.18-1.317.46-1.868a4.75 4.75 0 012.077-2.076c.55-.281 1.155-.403 1.868-.46.698-.058 1.563-.058 2.655-.058zM18.666 10c0 4.667-6 8-6.666 8-.667 0-6.667-3.333-6.667-8 0-2.333 2-4 4-4 .983 0 2 .334 2.667 1.334.666-1 1.666-1.348 2.666-1.334 2 .03 4 1.667 4 4z"
          fill="#83FDF4"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_28572_6908">
          <Path fill="#fff" transform="translate(2 2)" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export function RegInstaIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_28572_6923)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.985 1.868H15.015c1.092 0 1.957 0 2.655.057.713.058 1.317.18 1.868.46a4.75 4.75 0 012.076 2.077c.28.55.402 1.155.46 1.868.058.698.058 1.563.058 2.655V15.015c0 1.092 0 1.957-.057 2.655-.059.713-.18 1.317-.461 1.868a4.75 4.75 0 01-2.076 2.076c-.551.28-1.155.402-1.868.46-.698.058-1.563.058-2.655.058H8.985c-1.092 0-1.957 0-2.655-.057-.713-.059-1.317-.18-1.868-.461a4.75 4.75 0 01-2.076-2.076c-.281-.551-.403-1.155-.46-1.868-.058-.698-.058-1.563-.058-2.655V8.985c0-1.092 0-1.957.057-2.655.058-.713.18-1.317.46-1.868a4.75 4.75 0 012.077-2.076c.55-.281 1.155-.403 1.868-.46.698-.058 1.563-.058 2.655-.058zm.312 16.66c.695.03.91.04 2.7.04 1.783 0 2.011 0 2.708-.04a4.828 4.828 0 001.594-.306 3.37 3.37 0 001.921-1.917c.192-.51.295-1.049.306-1.594.03-.69.041-.922.041-2.7 0-1.776 0-2.004-.04-2.702a4.78 4.78 0 00-.308-1.614 3.363 3.363 0 00-1.92-1.917 4.8 4.8 0 00-1.597-.306h-.012c-.68-.03-.896-.04-2.694-.04-1.779 0-2.007 0-2.704.04a4.77 4.77 0 00-1.593.306 3.36 3.36 0 00-1.92 1.917 4.793 4.793 0 00-.305 1.59c-.032.696-.041.906-.041 2.702 0 1.777 0 2.006.04 2.704.011.544.115 1.083.306 1.592A3.366 3.366 0 007.697 18.2c.509.2 1.048.31 1.594.328h.006zm.02-11.903c.687-.03.88-.04 2.654-.04 1.775 0 1.96 0 2.665.04a3.61 3.61 0 011.218.227A2.186 2.186 0 0117.101 8.1c.144.39.22.8.227 1.215.031.695.04.882.04 2.661 0 1.78 0 1.965-.032 2.661h-.008c-.005.42-.081.836-.227 1.23a2.186 2.186 0 01-1.247 1.244c-.39.145-.802.221-1.218.227h-.003c-.688.032-.876.04-2.662.04-1.773 0-1.96 0-2.665-.04a3.594 3.594 0 01-1.217-.227 2.18 2.18 0 01-1.254-1.246c-.144-.39-.22-.8-.227-1.216-.032-.701-.038-.913-.038-2.661 0-1.769 0-1.954.038-2.66.005-.42.081-.835.227-1.228A2.178 2.178 0 018.09 6.852c.39-.144.801-.22 1.217-.226h.01zm-.437 6.649a3.371 3.371 0 006.486-1.29c0-1.363-.823-2.59-2.083-3.11a3.375 3.375 0 00-3.674.73 3.363 3.363 0 00-.73 3.67zm.928-1.292c0-1.207.98-2.185 2.188-2.185a2.191 2.191 0 012.188 2.185c0 1.206-.98 2.184-2.188 2.184a2.186 2.186 0 01-2.188-2.184zm4.906-3.49a.786.786 0 101.57.001.786.786 0 00-1.57-.002z"
          fill="#83FDF4"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_28572_6923">
          <Path fill="#fff" transform="translate(2 2)" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export function RegBagIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_28572_6935)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.985 1.868H15.015c1.092 0 1.957 0 2.655.057.713.058 1.317.18 1.868.46a4.75 4.75 0 012.076 2.077c.28.55.402 1.155.46 1.868.058.698.058 1.563.058 2.655V15.015c0 1.092 0 1.957-.057 2.655-.059.713-.18 1.317-.461 1.868a4.75 4.75 0 01-2.076 2.076c-.551.28-1.155.402-1.868.46-.698.058-1.563.058-2.655.058H8.985c-1.092 0-1.957 0-2.655-.057-.713-.059-1.317-.18-1.868-.461a4.75 4.75 0 01-2.076-2.076c-.281-.551-.403-1.155-.46-1.868-.058-.698-.058-1.563-.058-2.655V8.985c0-1.092 0-1.957.057-2.655.058-.713.18-1.317.46-1.868a4.75 4.75 0 012.077-2.076c.55-.281 1.155-.403 1.868-.46.698-.058 1.563-.058 2.655-.058zM10.4 5.425a.75.75 0 00-1.48.082l-.122.014c-.852.109-1.575.34-2.165.88a3.75 3.75 0 00-.231.232c-.541.59-.772 1.313-.88 2.165-.105.821-.105 1.86-.105 3.15v.104c0 1.29 0 2.329.104 3.15.109.852.34 1.574.88 2.165.075.08.152.157.232.231.59.541 1.313.772 2.165.88.821.105 1.86.105 3.15.105h.104c1.29 0 2.329 0 3.15-.104.852-.109 1.574-.34 2.165-.88.08-.075.157-.152.231-.232.541-.59.772-1.313.88-2.165.105-.821.105-1.86.105-3.15v-.104c0-1.29 0-2.329-.104-3.15-.109-.852-.34-1.575-.88-2.165a3.758 3.758 0 00-.232-.231c-.59-.541-1.313-.772-2.165-.88a8.132 8.132 0 00-.123-.015.75.75 0 00-1.479-.082c-.47-.008-.986-.008-1.548-.008h-.104c-.563 0-1.078 0-1.548.008zM9.083 9.167a.5.5 0 100 1h5.834a.5.5 0 000-1H9.083z"
          fill="#83FDF4"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_28572_6935">
          <Path fill="#fff" transform="translate(2 2)" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export function RegDiamondIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_28572_6948)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.985 1.868H15.015c1.092 0 1.957 0 2.655.057.713.058 1.317.18 1.868.46a4.75 4.75 0 012.076 2.077c.28.55.402 1.155.46 1.868.058.698.058 1.563.058 2.655V15.015c0 1.092 0 1.957-.057 2.655-.059.713-.18 1.317-.461 1.868a4.75 4.75 0 01-2.076 2.076c-.551.28-1.155.402-1.868.46-.698.058-1.563.058-2.655.058H8.985c-1.092 0-1.957 0-2.655-.057-.713-.059-1.317-.18-1.868-.461a4.75 4.75 0 01-2.076-2.076c-.281-.551-.403-1.155-.46-1.868-.058-.698-.058-1.563-.058-2.655V8.985c0-1.092 0-1.957.057-2.655.058-.713.18-1.317.46-1.868a4.75 4.75 0 012.077-2.076c.55-.281 1.155-.403 1.868-.46.698-.058 1.563-.058 2.655-.058zm3.71 15.69l2.609-7.668H19l-6.305 7.668zM5.03 9.408l2.003-2.23 1.402 2.23H5.03zm10.535 0l1.402-2.23 2.003 2.23h-3.405zM5 9.89h3.696l2.61 7.668L5 9.89zm10.06-.632L12.625 7h3.852l-1.419 2.258zm-6.119 0L7.522 7h3.852L8.94 9.258zM12 18L9.24 9.89h5.52L12 18zM9.513 9.408L12 7.1l2.487 2.308H9.513z"
          fill="#83FDF4"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_28572_6948">
          <Path fill="#fff" transform="translate(2 2)" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export function CameraIcon({color="#fff", opacity=0.3}) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.249 3.275a4.548 4.548 0 013.784-2.025h1.934c1.521 0 2.941.76 3.784 2.025a3.047 3.047 0 001.939 1.298l.135.027a4.882 4.882 0 013.925 4.787v3.864c0 1.74 0 3.103-.112 4.188-.113 1.106-.35 2.007-.878 2.787a5.749 5.749 0 01-1.534 1.534c-.78.528-1.68.765-2.787.878-1.085.112-2.449.112-4.188.112H10.749c-1.74 0-3.103 0-4.188-.112-1.106-.113-2.007-.35-2.787-.878a5.75 5.75 0 01-1.534-1.534c-.528-.78-.765-1.68-.878-2.787-.112-1.085-.112-2.449-.112-4.188V9.388A4.882 4.882 0 015.175 4.6l.135-.027A3.048 3.048 0 007.25 3.275zM12 17a4 4 0 100-8 4 4 0 000 8z"
        fill={color}
        fillOpacity={opacity}
      />
    </Svg>
  )
}

export function SmileIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12 17.937 22.75 12 22.75 1.25 17.937 1.25 12zm7.35 2.55a.75.75 0 00-1.2.9 5.743 5.743 0 004.6 2.3 5.743 5.743 0 004.6-2.3.75.75 0 10-1.2-.9 4.243 4.243 0 01-3.4 1.7 4.242 4.242 0 01-3.4-1.7zM10 10a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z"
        fill="#83FDF4"
      />
    </Svg>
  )
}

export function CameraMiniIcon(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.28 2.352A3.598 3.598 0 018.274.75h1.452c1.203 0 2.326.601 2.994 1.602.308.463.788.785 1.334.894l.102.02c1.799.36 3.094 1.94 3.094 3.775v2.994c0 1.359 0 2.188-.18 2.89a5.75 5.75 0 01-4.145 4.146c-.702.18-1.531.18-2.89.179h-2.07c-1.359 0-2.188 0-2.89-.18A5.75 5.75 0 01.93 12.926c-.18-.702-.18-1.531-.179-2.89V7.04a3.849 3.849 0 013.094-3.775l.102-.02a2.098 2.098 0 001.334-.894zM9 12.75a3 3 0 100-6 3 3 0 000 6z"
        fill="#fff"
      />
    </Svg>
  )
}

export function ImgIcon(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.972.938c-1.378 0-2.45 0-3.308.077-.87.08-1.573.242-2.195.6A5.062 5.062 0 001.616 3.47c-.36.622-.522 1.325-.6 2.195-.079.857-.079 1.93-.079 3.308v.056c0 1.378 0 2.45.078 3.308.08.87.242 1.573.6 2.195a5.063 5.063 0 001.854 1.853c.622.36 1.325.522 2.195.6.857.078 1.93.078 3.308.078h.056c1.378 0 2.45 0 3.308-.077.87-.08 1.573-.242 2.195-.6a5.064 5.064 0 001.853-1.854c.36-.622.522-1.325.6-2.195.078-.857.078-1.93.078-3.308v-.056c0-1.378 0-2.45-.077-3.308-.08-.87-.242-1.573-.6-2.195a5.063 5.063 0 00-1.854-1.853c-.622-.36-1.325-.522-2.195-.6-.857-.079-1.93-.079-3.308-.079h-.056zM13.5 6a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm1.98 6.621a.35.35 0 01.1.314c-.078.391-.186.687-.332.94a3.75 3.75 0 01-1.373 1.373c-.389.224-.878.36-1.658.43-.79.071-1.801.072-3.217.072-1.416 0-2.427 0-3.217-.072-.78-.07-1.27-.206-1.658-.43a3.75 3.75 0 01-1.373-1.373.781.781 0 01-.122-.302.921.921 0 01.059-.448c.056-.12.132-.196.284-.348L4.66 11.09c.986-.986 1.48-1.48 2.094-1.484.615-.005 1.116.481 2.117 1.453l1.615 1.569c.21.203.545.2.751-.006 1-1 1.501-1.5 2.122-1.5.622 0 1.122.5 2.122 1.5z"
        fill="#fff"
      />
    </Svg>
  )
}

 export function CalendarIcon(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_28572_7269)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.667.083a.75.75 0 01.75.75v.119c.66-.036 1.444-.036 2.42-.035h.327c.976 0 1.759 0 2.42.035V.833a.75.75 0 011.5 0v.317c.095.024.188.05.28.079a6.75 6.75 0 014.407 4.408c.313.992.313 2.184.313 4.199v.328c0 2.015 0 3.207-.313 4.199a6.75 6.75 0 01-4.408 4.408c-.992.313-2.184.313-4.199.312h-.328c-2.014 0-3.207 0-4.199-.312a6.75 6.75 0 01-4.408-4.408c-.312-.992-.312-2.184-.312-4.2v-.327c0-2.015 0-3.207.312-4.2A6.75 6.75 0 015.637 1.23c.092-.029.185-.055.28-.079V.833a.75.75 0 01.75-.75zM5.084 6.667a.75.75 0 01.75-.75h8.333a.75.75 0 010 1.5H5.834a.75.75 0 01-.75-.75z"
          fill="#B5B5B5"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_28572_7269">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export function RegMapIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_28572_6720)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.985 1.868H15.015c1.092 0 1.957 0 2.655.057.713.058 1.317.18 1.868.46a4.75 4.75 0 012.076 2.077c.28.55.402 1.155.46 1.868.058.698.058 1.563.058 2.655V15.015c0 1.092 0 1.957-.057 2.655-.059.713-.18 1.317-.461 1.868a4.75 4.75 0 01-2.076 2.076c-.551.28-1.155.402-1.868.46-.698.058-1.563.058-2.655.058H8.985c-1.092 0-1.957 0-2.655-.057-.713-.059-1.317-.18-1.868-.461a4.75 4.75 0 01-2.076-2.076c-.281-.551-.403-1.155-.46-1.868-.058-.698-.058-1.563-.058-2.655V8.985c0-1.092 0-1.957.057-2.655.058-.713.18-1.317.46-1.868a4.75 4.75 0 012.077-2.076c.55-.281 1.155-.403 1.868-.46.698-.058 1.563-.058 2.655-.058zM12 5.096c-3.434 0-6.289 2.434-6.289 5.981 0 2.66 1.193 4.617 2.542 5.895a8.47 8.47 0 002.03 1.427c.615.306 1.239.505 1.717.505s1.102-.2 1.718-.505a8.472 8.472 0 002.028-1.427c1.35-1.278 2.542-3.234 2.542-5.895 0-3.547-2.855-5.98-6.288-5.98zm0 8.135c.246 0 2.461-1.197 2.461-2.872 0-.837-.738-1.425-1.476-1.436-.37-.005-.739.12-.985.479-.246-.36-.622-.479-.985-.479-.738 0-1.477.599-1.477 1.436 0 1.675 2.216 2.872 2.462 2.872z"
          fill="#83FDF4"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_28572_6720">
          <Path fill="#fff" transform="translate(2 2)" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export function CloseIcon(props) {
  return (
    <Svg
      width={26}
      height={27}
      viewBox="0 0 26 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        opacity={0.6}
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M9.165 9.518l7.67 7.965M16.835 9.518l-7.67 7.965" />
      </G>
    </Svg>
  )
}

export function OKIcon(props) {
  return (
    <Svg
      width={27}
      height={27}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width={27} height={27} rx={13.5} fill="#83FDF4" />
      <Path
        d="M7 13.904L11.073 18 20 9"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function TGIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.566 1.25H12.434c1.651 0 2.937 0 3.968.084 1.047.086 1.897.262 2.662.652a6.75 6.75 0 012.95 2.95c.39.765.566 1.615.652 2.662.084 1.031.084 2.317.084 3.968V12.434c0 1.651 0 2.937-.084 3.968-.086 1.047-.262 1.897-.652 2.662a6.75 6.75 0 01-2.95 2.95c-.765.39-1.615.566-2.662.652-1.031.084-2.317.084-3.968.084H11.566c-1.651 0-2.937 0-3.968-.084-1.047-.086-1.897-.262-2.662-.652a6.75 6.75 0 01-2.95-2.95c-.39-.765-.566-1.615-.652-2.662-.084-1.031-.084-2.317-.084-3.968V11.566c0-1.651 0-2.937.084-3.968.086-1.047.262-1.897.652-2.662a6.75 6.75 0 012.95-2.95c.765-.39 1.615-.566 2.662-.652 1.031-.084 2.317-.084 3.968-.084zm7.427 6.527c.116-1.156-1.272-.68-1.272-.68-1.024.373-2.081.753-3.15 1.136-3.31 1.189-6.732 2.417-9.647 3.625-1.58.51-.655 1.02-.655 1.02l2.505.681c1.157.306 1.774-.034 1.774-.034l3.89-1.942c1.927-1.156 1.4-.269.937.14l-2.476 2.176c-.617.476-.309.884-.039 1.089.765.593 2.646 1.68 3.467 2.154.214.123.356.205.388.226.192.136 1.233.748 1.927.612s.77-.918.77-.918l.926-5.34c.139-.926.298-1.817.425-2.53.12-.671.211-1.183.23-1.415z"
        fill="#fff"
      />
    </Svg>
  )
}

export function LikeIcon(props) {
  return (
    <Svg
      width={60}
      height={61}
      viewBox="0 0 60 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect y={0.105957} width={60} height={60} rx={30} fill="#88FFF9" />
      <Path
        d="M30 38.206c.9 0 9-4.5 9-10.8 0-3.15-2.7-5.36-5.4-5.4-1.35-.02-2.7.45-3.6 1.8-.9-1.35-2.273-1.8-3.6-1.8-2.7 0-5.4 2.25-5.4 5.4 0 6.3 8.1 10.8 9 10.8z"
        fill="#17171A"
      />
    </Svg>
  )
}

export function EditIcon(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3.257 11.361l-.14 1.443a1 1 0 001.08 1.094l1.905-.163a1 1 0 00.632-.3l3.703-3.802c.545-.56.253-1.514-.419-1.914a2.31 2.31 0 01-.36-.26 2.68 2.68 0 01-.436-.531c-.417-.643-1.364-.853-1.884-.29l-3.82 4.142a1 1 0 00-.261.581zM10.226 3.37l-.653.806a.981.981 0 00-.014 1.227c.286.362.654.816.967 1.165.365.405.803.704 1.148.9.346.198.77.104 1.047-.182l.858-.88a1 1 0 00.235-1.007l-.02-.062a1 1 0 00-.283-.435L11.68 3.256A1 1 0 0011.01 3h-.008a1 1 0 00-.777.37z"
        fill="#fff"
      />
      <Path
        d="M3.257 11.361l-.14 1.443a1 1 0 001.08 1.094l1.905-.163a1 1 0 00.632-.3l3.703-3.802c.545-.56.253-1.514-.419-1.914a2.31 2.31 0 01-.36-.26 2.68 2.68 0 01-.436-.531c-.417-.643-1.364-.853-1.884-.29l-3.82 4.142a1 1 0 00-.261.581zM10.226 3.37l-.653.806a.981.981 0 00-.014 1.227c.286.362.654.816.967 1.165.365.405.803.704 1.148.9.346.198.77.104 1.047-.182l.858-.88a1 1 0 00.235-1.007l-.02-.062a1 1 0 00-.283-.435L11.68 3.256A1 1 0 0011.01 3h-.008a1 1 0 00-.777.37z"
        stroke="#fff"
        strokeWidth={0.8}
      />
    </Svg>
  )
}

export function TrashIcon(props) {
  return (
    <Svg
      width={16}
      height={17}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.73 1.083H7.62c-.513 0-.962-.001-1.363.156a2.25 2.25 0 00-.903.65c-.267.32-.408.729-.562 1.194h-3.46a.75.75 0 000 1.5h.627l.35 5.97.006.084c.044.754.072 1.234.173 1.65a4.75 4.75 0 003.768 3.553c.422.077.903.077 1.658.077h.17c.755 0 1.236 0 1.658-.077a4.75 4.75 0 003.768-3.553c.101-.416.13-.896.173-1.65l.005-.085.351-5.969h.627a.75.75 0 000-1.5h-3.46c-.154-.465-.295-.874-.562-1.193a2.25 2.25 0 00-.903-.65c-.4-.158-.85-.158-1.363-.157H7.73zm1.885 2a.794.794 0 00-.12-.23.75.75 0 00-.302-.218c-.1-.039-.237-.052-.923-.052h-.54c-.686 0-.823.013-.923.052a.75.75 0 00-.301.217.794.794 0 00-.121.231h3.23z"
        fill="red"
        fillOpacity={0.4}
      />
    </Svg>
  )
}

export function PlusIcon(props) {
  return (
    <Svg
      width={46}
      height={46}
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M13.476 23h19.048M23 13.476v19.048"
        stroke="#171717"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function BackArrowIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14.75 17.5L9.25 12l5.5-5.5"
        stroke="#fff"
        strokeOpacity={0.6}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function AlertIcon(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.698.455a3.75 3.75 0 00-1.396 0c-.973.185-1.7.866-2.378 1.789-.673.915-1.4 2.215-2.324 3.864l-.027.049-.027.048C1.659 7.788.958 9.04.544 10.056.125 11.083-.071 12.03.258 12.94c.156.433.391.834.693 1.182.633.731 1.555 1.023 2.655 1.16 1.09.135 2.524.135 4.339.135h.11c1.815 0 3.25 0 4.338-.136 1.101-.136 2.023-.428 2.656-1.16.302-.347.537-.748.693-1.181.329-.91.133-1.857-.286-2.884-.414-1.016-1.115-2.268-2.002-3.851l-.027-.048-.027-.049c-.923-1.649-1.652-2.95-2.324-3.864C10.398 1.32 9.67.64 8.698.455zM8.75 6a.75.75 0 10-1.5 0v2.667a.75.75 0 101.5 0V6zm-.083 4.667a.667.667 0 11-1.334 0 .667.667 0 011.334 0z"
        fill="#BC1115"
      />
    </Svg>
  )
}

export function CloseEyeIcon(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.53 1.47a.75.75 0 00-1.06 1.06l1.289 1.29C1.299 5.128.583 6.842.583 8c0 1.068.607 2.58 1.793 3.812C3.593 13.075 5.451 14.083 8 14.083c1.601 0 2.935-.398 4.01-1.013l1.46 1.46a.75.75 0 101.06-1.06l-1.883-1.884-8.233-8.232L2.53 1.47zM9.34 10.4L8.178 9.239a1.25 1.25 0 01-1.414-1.415L5.597 6.659a2.75 2.75 0 003.742 3.742zm-3.15-6.76A7.101 7.101 0 018 3.416c2.118 0 3.593.825 4.543 1.812.98 1.017 1.374 2.173 1.374 2.771 0 .422-.198 1.15-.701 1.925a5.628 5.628 0 01-.205.294.75.75 0 001.204.895c.092-.123.178-.248.26-.372.613-.946.942-1.954.942-2.742 0-1.068-.607-2.58-1.793-3.812C12.407 2.925 10.549 1.917 8 1.917a8.6 8.6 0 00-2.56.38.75.75 0 10.453 1.43c.097-.031.196-.06.297-.087z"
        fill="#fff"
      />
    </Svg>
  )
}
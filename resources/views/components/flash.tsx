import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import clsx from 'clsx'

type NotifType = 'success' | 'error' | 'info' | 'warning' | 'neutral'
type StateType = React.Dispatch<React.SetStateAction<boolean>>
type FlashPropsInternal = {
  message: string
  state: StateType
  isTiny?: boolean
}
interface FlashProps extends FlashPropsInternal {
  type: NotifType
}

export default function Flash({ type, message, state, isTiny }: FlashProps) {
  let Component

  switch (type) {
    case 'error':
      Component = <Error message={message} state={state} />
      break

    case 'info':
      Component = <Info message={message} state={state} />
      break

    case 'success':
      Component = <Success message={message} state={state} />
      break

    case 'warning':
      Component = <Warning message={message} state={state} />
      break

    default:
      Component = <Neutral message={message} state={state} />
      break
  }

  let size = 'mb-2 p-4'

  if (isTiny) {
    size = 'p-2'
  }

  return <div className={clsx(size, 'rounded-md bg-red-50')}>{Component}</div>
}

function Success({ message, state }: FlashPropsInternal) {
  return (
    <div className="flex">
      <div className="flex-shrink-0">
        <CheckCircleIcon aria-hidden="true" className="size-5 text-green-400" />
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-green-800">{message}</p>
      </div>
      <div className="ml-auto pl-3">
        <ClosingButton state={state} />
      </div>
    </div>
  )
}

function Error({ message, state }: FlashPropsInternal) {
  return (
    <div className="flex">
      <div className="flex-shrink-0">
        <XCircleIcon aria-hidden="true" className="size-5 text-red-400" />
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-red-800">{message}</p>
      </div>
      <div className="ml-auto pl-3">
        <ClosingButton state={state} />
      </div>
    </div>
  )
}

function Info({ message, state }: FlashPropsInternal) {
  return (
    <div className="flex">
      <div className="flex-shrink-0">
        <InformationCircleIcon aria-hidden="true" className="size-5 text-blue-400" />
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-blue-800">{message}</p>
      </div>
      <div className="ml-auto pl-3">
        <ClosingButton state={state} />
      </div>
    </div>
  )
}

function Warning({ message, state }: FlashPropsInternal) {
  return (
    <div className="flex">
      <div className="flex-shrink-0">
        <ExclamationCircleIcon aria-hidden="true" className="size-5 text-yellow-400" />
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-yellow-800">{message}</p>
      </div>
      <div className="ml-auto pl-3">
        <div className="ml-auto pl-3">
          <ClosingButton state={state} />
        </div>
      </div>
    </div>
  )
}

function Neutral({ message, state }: FlashPropsInternal) {
  return (
    <div className="flex">
      <div className="flex-shrink-0">
        <QuestionMarkCircleIcon aria-hidden="true" className="size-5 text-gray-400" />
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-800">{message}</p>
      </div>
      <div className="ml-auto pl-3">
        <div className="ml-auto pl-3">
          <ClosingButton state={state} />
        </div>
      </div>
    </div>
  )
}

function ClosingButton({ state }: { state: StateType }) {
  // nice to have: color the button with the same color as the message
  // example error: bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50
  // example success: bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50
  return (
    <div className="-mx-1.5 -my-1.5">
      <button
        type="button"
        className="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
        onClick={() => state(false)}
      >
        <span className="sr-only">Dismiss</span>
        <XMarkIcon aria-hidden="true" className="size-5" />
      </button>
    </div>
  )
}

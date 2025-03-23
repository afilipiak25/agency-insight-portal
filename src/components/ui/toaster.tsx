import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  // The component is kept, but it will never render any toasts
  // since the toast state will always be empty
  return (
    <ToastProvider>
      {/* No toasts will be mapped because the array is always empty */}
      <ToastViewport />
    </ToastProvider>
  )
}

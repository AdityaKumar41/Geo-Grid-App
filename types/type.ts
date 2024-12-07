export interface OnboardingSlide {
  id: number;
  title: string[];
  description: string[];
  leaveBalance?: number;
  imageUri: string;
}

export interface OnboardingState {
  currentSlideIndex: number;
  slides: OnboardingSlide[];
}

export interface OnboardingSlideProps {
  slide: OnboardingSlide;
  isActive: boolean;
  totalSlides: number;
  onNext: () => void;
}

export interface DotIndicatorProps {
  currentIndex: number;
  totalSlides: number;
}

export interface InputFieldProps {
  label: string;
  iconUrl: string;
  placeholder: string;
  type?: string;
  hasEndIcon?: boolean;
  endIconUrl?: string;
}

export interface DateItemProps {
  day: number;
  weekday: string;
  isActive?: boolean;
}

export interface AttendanceItemProps {
  type: "checkin" | "checkout";
  time: string;
  status: string;
  icon: string;
}

export interface TaskItemProps {
  title: string;
  icon: string;
  status: string;
  priority: string;
  progress: number;
  assignees: string[];
  dueDate: string;
  commentCount: number;
}

export interface HeaderProps {
  name: string;
  role: string;
  avatar: string;
  verifiedIcon: string;
  notificationIcon: string;
  menuIcon: string;
}

export interface ProfileItemProps {
  icon: string;
  label: string;
  showArrow?: boolean;
}

export interface ProfileSectionProps {
  title: string;
  items: ProfileItemProps[];
}

export interface MessageItem {
  id: string;
  image: string;
  title: string;
  time: string;
  description: string;
}

export interface AttendanceRecord {
  date: string;
  totalHours: string;
  checkInTime: string;
  checkOutTime: string;
}

export interface WorkingPeriodStats {
  totalWorkingHours: string;
  totalBreakHours: string;
  paidPeriod: string;
}

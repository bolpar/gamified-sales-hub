import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  variant?: "default" | "success" | "warning" | "primary";
  children?: ReactNode;
}

export function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
  variant = "default",
  children
}: DashboardCardProps) {
  const variantClasses = {
    default: "bg-card border-border",
    success: "bg-gradient-success text-success-foreground border-success/20",
    warning: "bg-gradient-warning text-warning-foreground border-warning/20", 
    primary: "bg-gradient-primary text-primary-foreground border-primary/20"
  };

  return (
    <div className={cn(
      "rounded-lg border p-6 shadow-card hover:shadow-hover transition-all duration-200",
      "animate-scale-in",
      variantClasses[variant],
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className={cn(
            "text-sm font-medium",
            variant === "default" ? "text-muted-foreground" : "text-current opacity-80"
          )}>
            {title}
          </p>
          <div className="flex items-center gap-2">
            <p className={cn(
              "text-2xl font-bold",
              variant === "default" ? "text-foreground" : "text-current"
            )}>
              {value}
            </p>
            {trend && (
              <span className={cn(
                "text-sm font-medium flex items-center gap-1",
                trend.isPositive 
                  ? variant === "default" ? "text-metric-positive" : "text-current opacity-90"
                  : variant === "default" ? "text-metric-negative" : "text-current opacity-90"
              )}>
                {trend.isPositive ? "↗" : "↘"} {trend.value}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className={cn(
              "text-xs",
              variant === "default" ? "text-muted-foreground" : "text-current opacity-70"
            )}>
              {subtitle}
            </p>
          )}
        </div>
        
        {Icon && (
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            variant === "default" 
              ? "bg-primary/10 text-primary" 
              : "bg-current/10 text-current"
          )}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
      
      {children && (
        <div className="mt-4 pt-4 border-t border-current/10">
          {children}
        </div>
      )}
    </div>
  );
}
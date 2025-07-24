import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  target?: string | number;
  subtitle?: string;
  icon: LucideIcon;
  progress?: number; // 0-100
  variant?: "default" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
}

export function MetricCard({
  title,
  value,
  target,
  subtitle,
  icon: Icon,
  progress,
  variant = "default",
  size = "md",
  children
}: MetricCardProps) {
  const progressPercentage = progress || 0;
  const isOnTarget = progressPercentage >= 100;
  
  const variantColors = {
    default: {
      icon: "text-primary bg-primary/10",
      progress: "bg-primary",
      accent: "text-primary"
    },
    success: {
      icon: "text-success bg-success/10",
      progress: "bg-success",
      accent: "text-success"
    },
    warning: {
      icon: "text-warning bg-warning/10", 
      progress: "bg-warning",
      accent: "text-warning"
    },
    danger: {
      icon: "text-destructive bg-destructive/10",
      progress: "bg-destructive", 
      accent: "text-destructive"
    }
  };

  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };

  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-12 h-12"
  };

  const iconSizesInner = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };

  const currentVariant = isOnTarget ? variantColors.success : variantColors[variant];

  return (
    <div className={cn(
      "bg-card rounded-lg border border-border shadow-card hover:shadow-hover transition-all duration-200",
      "animate-scale-in",
      sizeClasses[size],
      isOnTarget && "animate-pulse-success"
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className={cn(
          "rounded-lg flex items-center justify-center",
          iconSizes[size],
          currentVariant.icon
        )}>
          <Icon className={iconSizesInner[size]} />
        </div>
        
        {target && (
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Meta</p>
            <p className="text-sm font-semibold text-foreground">{target}</p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {isOnTarget && (
            <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded-full font-medium">
              META BATIDA!
            </span>
          )}
        </div>

        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}

        {progress !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progresso</span>
              <span className={cn(
                "font-medium",
                currentVariant.accent
              )}>
                {progressPercentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={cn(
                  "h-2 rounded-full transition-all duration-500",
                  currentVariant.progress
                )}
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
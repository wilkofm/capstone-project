export const Card = ({ className, children, ...props }) => (
  <div
    className={`p-4 shadow-lg rounded-lg bg-customForeground text-gray-300 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ className, children, ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardContent = ({ className, children, ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className, children, ...props }) => (
  <h3 className={`text-lg font-bold ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ className, children, ...props }) => (
  <p className={`text-gray-500 ${className}`} {...props}>
    {children}
  </p>
);

export default interface SalesData {
    id: number; // The ID is a number
    name: string; // The name is a string
    date_sales: string; // The date_sales is a string (ISO date format)
    sales: string; // The sales is a string (numeric value as string)
    new_sales: string; // The new_sales is a string (numeric value as string)
    percentage_increase_sales: string; // The percentage_increase_sales is a string (percentage value with % sign)
    percent: number; // The percent is a number
} 
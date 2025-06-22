<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Display number into currency format
        \Blade::directive('convert', function ($money) {
            return "<?php echo number_format($money, 2); ?>";
        });

        // Display number into currency format
        \Blade::directive('toPercentage', function ($value) {
            return "<?php echo round(($value, 2); ?>";
        });
    }
}

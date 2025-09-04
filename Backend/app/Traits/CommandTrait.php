<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;

trait CommandTrait
{
    /**
     * Display information about the command start.
     *
     * @param string $message
     * @return float
     */
    public function displayCommandStart(string $message)
    {
        $scriptTimeStart = microtime(true);
        $this->info($message);

        return $scriptTimeStart;
    }

    /**
     * Truncate tables and disable/enable foreign key checks and disables query log.
     *
     * @param array $tables
     * @return void
     */
    public function truncateTables(array $tables, $disableQueryLog = false)
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        foreach ($tables as $table) {
            DB::table($table)->truncate();
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        if ($disableQueryLog) {
            DB::disableQueryLog();
        }
    }

    /**
     * Calculate and display the command execution time.
     *
     * @param float $scriptTimeStart
     * @return void
     */
    public function displayExecutionTime(float $scriptTimeStart)
    {
        $scriptTimeEnd = microtime(true);
        $scriptExecutionTime = ($scriptTimeEnd - $scriptTimeStart) / 60;
        $info = 'Command finished in ' . $scriptExecutionTime . ' minutes.';
        $this->components->info($info);
    }

    public function bulkInsert($model, $data)
    {
        if (!empty($data) && count($data) > 0) {
            $chunks = array_chunk($data, 1000);
            foreach ($chunks as $chunk) {
                $model::insert($chunk);
            }
        }
    }

    public function bulkInsertPivot($table, $data)
    {
        if (!empty($data) && count($data) > 0) {
            $chunks = array_chunk($data, 1000);
            foreach ($chunks as $chunk) {
                DB::table($table)->insert($chunk);
            }
        }
    }
}

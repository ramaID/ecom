<?php

namespace App\Policies;

use App\Models\User;

class AuthorPolicy
{
    private const TEST_EMAIL = 'test@example.com';

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return in_array($user->email, [self::TEST_EMAIL]);
    }

    /**
     * Determine whether the user can update models.
     */
    public function update(User $user): bool
    {
        return in_array($user->email, [self::TEST_EMAIL]);
    }

    /**
     * Determine whether the user can delete models.
     */
    public function delete(User $user): bool
    {
        return in_array($user->email, [self::TEST_EMAIL]);
    }
}

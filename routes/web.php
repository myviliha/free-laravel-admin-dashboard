<?php

use Illuminate\Support\Facades\Route;

/*
 | Generated from the free demo's page set. Do not edit: it is rewritten on every compose.
 |
 | One route per view in resources/views/vui-pages. The views link to each other with
 | url('/slug'), so these names and those links are one contract: rename a route and the
 | demo's own navigation stops resolving.
 */

Route::view('/', 'vui-pages.index')->name('dashboard');
Route::view('/alerts', 'vui-pages.alerts')->name('alerts');
Route::view('/avatars', 'vui-pages.avatars')->name('avatars');
Route::view('/badge', 'vui-pages.badge')->name('badge');
Route::view('/bar-chart', 'vui-pages.bar-chart')->name('bar-chart');
Route::view('/basic-tables', 'vui-pages.basic-tables')->name('basic-tables');
Route::view('/blank', 'vui-pages.blank')->name('blank');
Route::view('/buttons', 'vui-pages.buttons')->name('buttons');
Route::view('/calendar', 'vui-pages.calendar')->name('calendar');
Route::view('/error-404', 'vui-pages.error-404')->name('error-404');
Route::view('/form-elements', 'vui-pages.form-elements')->name('form-elements');
Route::view('/images', 'vui-pages.images')->name('images');
Route::view('/layouts', 'vui-pages.layouts')->name('layouts');
Route::view('/line-chart', 'vui-pages.line-chart')->name('line-chart');
Route::view('/modals', 'vui-pages.modals')->name('modals');
Route::view('/profile', 'vui-pages.profile')->name('profile');
Route::view('/signin', 'vui-pages.signin')->name('signin');
Route::view('/signup', 'vui-pages.signup')->name('signup');
Route::view('/videos', 'vui-pages.videos')->name('videos');

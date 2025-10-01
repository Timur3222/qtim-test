<template>
  <div>
    <header class="flex h-[121px] items-center justify-between px-10">
      <nav>
        <NuxtLink to="/">
          <NuxtImg src="/images/logo.svg" height="25px" alt="logo" />
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-[91px]">
        <NavLinks />
        <AppMenu />
      </div>
    </header>

    <main class="px-28 py-[120px] pb-[140px]">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

# Supabase
- Supabase URL configuration (https://supabase.com/dashboard/project/pcgvpypzfwuchyfwdlwe/auth/url-configuration) Site URL relinks to normal oparax.com URL we have to link it to an error page if nothing found

# Frontend UI
- Sign Up/ Sign in Button Feedback: Currently, the signup button shows no reaction when clicked (no shadow or color change). This lack of visual confirmation leads to accidental double-clicking, therefore generally all button UIs/UX has to be changed to have it change colors on hover, some anumation upon press, show a loading thing upon succesful press when waiting on server response for understandable ui

- Sign up double click errors: Double-clicking the sign up button in that confusion described above throws some sort of an error. It links to some error page. 

- Uniform Interaction: Hover and click states need to be applied uniformly across all buttons. The current hover shadow is too faint; a distinct color change is needed to clearly denote interaction.

- Loading State: There is no indication of a successful click or background processing. A loading indicator should appear on the button after it is pressed to signal that the server is returning a result.

# Vercel 
- On each deployment, when we merge to main and the deployment gets triggered on Vercel, we witness these three warnings in yellow, The big warning block and then the line starting with both, with the alert symbol before them in the output during deployment. Might as well just take care of these warnings. Why do these occur anyways:

```
╭ Warning ─────────────────────────────────────────────────────────────────────╮
│                                                                              │
│   Ignored build scripts: esbuild@0.27.3, msw@2.12.10.                        │
│   Run "pnpm approve-builds" to pick which dependencies should be allowed     │
│   to run scripts.                                                            │
│                                                                              │
╰──────────────────────────────────────────────────────────────────────────────╯
Done in 1.5s using pnpm v10.28.0
Detected Next.js version: 16.1.6
Running "pnpm run build"
> frontend@0.1.0 build /vercel/path0/frontend
> next build
⚠ Both `outputFileTracingRoot` and `turbopack.root` are set, but they must have the same value.
Using `outputFileTracingRoot` value: /vercel/path0.
▲ Next.js 16.1.6 (Turbopack)
  Creating an optimized production build ...
⚠ Both `outputFileTracingRoot` and `turbopack.root` are set, but they must have the same value.
Using `outputFileTracingRoot` value: /vercel/path0.
```
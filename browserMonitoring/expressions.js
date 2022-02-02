export const expressions = {
  body: /<body[^>]*>/i,
  head: /<head[^>]*>/i,
  meta: {
    xua: /<\s*meta[^>]+http-equiv\s*=\s*['"]x-ua-compatible['"][^>]*>/gi,
    charset: /<\s*meta[^>]+charset\s*=[^>]*>/gi,
    attachment:
      /<\s*meta[^>]+http-equiv\s*=\s*['"]content-disposition['"][^>]*content\s*=\s*['"]\s*attachment(\s*;[^>]*)?['"][^>]*>/gi,
  },
}

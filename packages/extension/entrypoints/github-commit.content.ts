import { defineContentScript } from 'wxt/utils/define-content-script'
import { githubHost } from '../src/git-hosts/hosts'
import { HostPage } from '../src/platform/page/HostPage'
import { DiffController } from '../src/views/diff-viewer/DiffController'

export default defineContentScript({
  registration: 'runtime',
  cssInjectionMode: 'manual',
  main(ctx) {
    new DiffController(new HostPage(ctx), githubHost.commitDiff).start()
  },
})

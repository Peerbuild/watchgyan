import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import FeatherIcon from 'feather-icons-react';
import React from 'react';
import BlogPublishDialog from './BlogPublishDialog';
import { useEditorMetadata } from '../Providers/EditorMetadataProvider';
import { isEditorContentEmpty } from '@/lib/utils';

export default function EditorHeader() {
  const { title, content } = useEditorMetadata();

  return (
    <header className="flex items-center justify-between px-12 py-10">
      <h1 className="font-serif text-xl font-medium">WatchGyan</h1>
      <div className="flex gap-4">
        <Button size={'icon'} variant={'ghost'}>
          <FeatherIcon icon="more-vertical" />
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button disabled={!title || isEditorContentEmpty(content)}>
              PUBLISH
            </Button>
          </DialogTrigger>
          <BlogPublishDialog />
        </Dialog>
        <Button variant={'secondary'} className="uppercase">
          PREVIEW
        </Button>
      </div>
    </header>
  );
}

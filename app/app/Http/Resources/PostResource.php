<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'content' => $this->content,
            'images' => $this->images,
            'other' => $this->other,
            'user' => new UserResource($this->user), // Prikazuje povezanog korisnika preko UserResource
            'topic' => new TopicResource($this->topic), // Prikazuje povezanu temu preko TopicResource
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

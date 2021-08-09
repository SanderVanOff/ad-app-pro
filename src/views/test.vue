      <div class="d-flex flex-column postitio-sticky top-0">
        
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators">
            <button
              v-for="(item, i) in currentAd.images"
              :key="item"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              :data-bs-slide-to="i"
              :class="{ active: currentImage === i }"
              aria-current="true"
              :aria-label="`Slide ${i + 1}`"
            ></button>
          </div>
          <div class="carousel-inner">
            <div
              class="carousel-item h-50"
              :data-bs-interval="false"
              :data="i"
              :class="{ active: currentImage === i }"
              v-for="(item, i) of currentAd.images"
              :key="item"
            >
              <img
                :src="item"
                class="
                  d-block
                  w-100
                  rounded
                  img-contain img-thumbnail
                  cursor-pointer
                  
                "
                alt="..."
                style="background-color: #212529; height: calc(100vh - 3rem);"
                data-bs-toggle="modal"
                data-bs-target="#modalImageId"
                @click="modalImage = item"
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <!-- Data -->
      <div class="d-flex flex-column bg-dark text-white p-0 product-data">
        <div class="card_info">
          <div class="card-header bg-danger fs-2">
            {{ getCostInCurrency(currentAd.cost) }}
          </div>
          <div class="card-body">
          <h3 class="card-title break-word mb-3 pe-4">{{ currentAd.title }}</h3>
            <div class="card-body__views mb-2">
              <div
                class="text-start mt-4 px-2"
                v-html="currentAd.description.replaceAll('\n', '<br/>')"
              ></div>
              <hr />
              <p class="card-text">
                <span class="fw-bold me-2 px-2">Город:</span>
                {{ currentAd.city }}
              </p>

              <p class="card-text">
                <span class="fw-bold me-2 px-2">Состояние:</span>
                {{ isCondition }}
              </p>

              <p class="card-text px-2">
                <span class="fw-bold me-2">Доставка:</span>
                {{ isDelivery }}
              </p>

              <hr />
              <span class="me-2">Добавлено:</span>
              <span class="me-2">{{ getDateAd(currentAd.createDate) }}</span>
              <i class="fas fa-calendar-alt"></i>
            </div>

            <div class="card-body__views mb-2">
              <span class="me-2">Просмотров:</span>
              <span class="me-2">{{
                currentAd.views ? currentAd.views.length : 0
              }}</span>
              <i class="fas fa-eye"></i>
            </div>

            <div class="card-body__views mb-3">
              <span class="me-2">В избранном:</span>
              <span class="me-2">{{
                currentAd.likes ? currentAd.likes.length : 0
              }}</span>
              <i class="fas fa-heart"></i>
            </div>

            <button
              type="button"
              class="btn btn-warning d-flex align-items-center"
              @click="addLikes(currentAd.id)"
            >
              <i class="far fa-heart fs-4 me-3"></i>
              <span>{{ textFavoriteButton }}</span>
            </button>
            <hr />
            <div class="user-info d-flex justify-content-around">
            
            <div class="buttons-group d-flex flex-column justify-content-evenly">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalPhone"
                :disabled="currentAd.communication === 'OnlyMessage'"
              >
                {{
                  currentAd.communication === "OnlyMessage"
                    ? "Номер скрыт"
                    : "Показать номер"
                }}
              </button>
              <button type="button" class="btn btn-success">Написать</button>
            </div>
            <div class="d-flex flex-column align-items-center">
              <img
                :src="userAd.avatar"
                class="img-thumbnail me-3 rounded-circle user-avatar"
                alt="..."
              />
              <h5 class="card-title mt-3">{{ userAd.login }}</h5>
            </div>
            </div>
          </div>
        </div>
      </div>